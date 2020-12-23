import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { Stripe } from "@ionic-native/stripe";
import { ConfigProvider } from "../../providers/config/config";
import { ChatPage } from "../chat/chat";

@IonicPage()
@Component({
  selector: "page-reschedule",
  templateUrl: "reschedule.html",
})
export class ReschedulePage {
  ResedulInfo: any;
  JobId: any;
  DateNew: any;
  TimeNew: any;
  JobType: any;
  PaymentOp: any;
  card_number: any;
  card_cvc: any;
  card_month: any;
  card_year: any;
  ShowTime: any;
  reason: any;
  ServiceUser: any;
  ServiceUserNm: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    private stripe: Stripe,
    public config: ConfigProvider
  ) {
    this.ResedulInfo = "0";
    this.PaymentOp = "0";
    this.ShowTime = "0";
  }

  ionViewDidLoad() {
    console.log("Reschedule ");
    var jobData = this.navParams.get("jobData");
    console.log("job data", jobData);
    this.JobType = jobData.Jobtype;
    this.JobId = jobData.JobNo;
    this.DateNew = jobData.Jobdate;
    this.TimeNew = jobData.Jobtime;
    var Datew = jobData.Jobdate;
    this.ServiceUser = jobData.serviceUser;
    this.ServiceUserNm = jobData.ServiceUserNm;
    console.log(this.ServiceUser + " =>" + this.ServiceUserNm);
    var datsplit = Datew.split(",");
    if (datsplit) {
      this.DateNew = datsplit[0];
    }
    var timeew = jobData.Jobtime;
    var timsplit = timeew.split(",");
    if (timsplit) {
      this.TimeNew = timsplit[0];
    }
  }

  ClientRequested() {
    this.ResedulInfo = "1";
  }

  BackClinet(bc) {
    this.ResedulInfo = bc;
  }

  Reschedul() {
    this.ResedulInfo = "2";
  }
  sendMessage(info) {
    this.navCtrl.push(ChatPage, {
      id: this.ServiceUser,
      name: this.ServiceUserNm,
      type: 1, //reshedule
      reason: this.reason,
      changedInfo: info,
    });

    this.Reschedul();
  }
  ContinueRes() {
    this.alert.showLoader("");
    var params = {
      id: this.JobId,
      jdate: this.DateNew,
      jtime: this.TimeNew,
    };
    console.log(params);
    this.service.ResedulJob(params).then((results) => {
      this.HandleRechedul(results);

      this.sendMessage(params);
    });
  }

  HandleRechedul(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      var data = "Success";
      /*  this.viewCtrl.dismiss(results.ResponseCode)
      ; */
      this.alert.showAlert("sucess", results.ResponseMsg);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  PaymentOption(pty) {
    if (pty == "1") {
      this.PaymentOp = "1";
      this.CashPay(pty, "1");
    } else if (pty == "2") {
      this.PaymentOp = "2";
      this.CashPay(pty, "0");
    } else if (pty == "3") {
      this.PaymentOp = "3";
    }
  }

  CashPay(pty, sts) {
    this.alert.showLoader("");
    var params = {
      id: this.JobId,
      payment_type: pty,
      payment_status: sts,
    };
    console.log(params);
    this.service
      .PayPayment(params)
      .then((results) => this.HandlePaymet(results));
  }

  HandlePaymet(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      var data = "Success";
      this.viewCtrl.dismiss(data);
      this.alert.showAlert("Success", results.ResponseMsg);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  StripePay() {
    this.stripe.setPublishableKey("pk_test_Bu3c9VqObx17WvfO6IW1CmRU");
    if (this.validate()) {
      this.alert.showLoader("");
      let card = {
        number: this.card_number,
        expMonth: this.card_month,
        expYear: this.card_year,
        cvc: this.card_cvc,
      };
      this.stripe
        .createCardToken(card)
        .then((token) => {
          console.log(token);
          this.TokenID(token);
        })
        .catch((error) => console.error(error));
    }
  }

  TokenID(token) {
    var email = this.config.Email;
    var params = {
      stripeToken: token.id,
      email: email,
      amount: "5",
    };
    console.log(params);
    this.service.StripePay(params).then((results) => this.HandlePay(results));
  }

  HandlePay(results) {
    console.log(results);
    this.alert.dissmissLoader();
    console.log(results.status);
    if (results.status == "succeeded") {
      this.CashPay("3", "1");
    } else {
      this.alert.showAlert("Error", results.status);
    }
  }

  validate() {
    if (!this.card_number) {
      this.alert.showAlert("Attention", "Please enter valid Card Number!");
      return false;
    } else if (!this.card_month) {
      this.alert.showAlert(
        "Attention",
        "Please enter valid Card Expiry Month!"
      );
      return false;
    } else if (!this.card_year) {
      this.alert.showAlert("Attention", "Please enter valid Card Expiry Year!");
      return false;
    } else if (!this.card_cvc) {
      this.alert.showAlert("Attention", "Please enter valid Card CVC!");
      return false;
    }
    return true;
  }

  BackPayment(tyd) {
    this.PaymentOp = tyd;
  }

  SelectTime() {
    console.log("input");
    this.ShowTime = "1";
  }

  TimeSelect(tm) {
    this.TimeNew = tm;
    this.ShowTime = "0";
  }
}

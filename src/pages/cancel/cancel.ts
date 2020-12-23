import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";

@IonicPage()
@Component({
  selector: "page-cancel",
  templateUrl: "cancel.html",
})
export class CancelPage {
  ReasonS: any;
  UserData: any;
  UserId: any;
  JobId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alert: AlertProvider,
    private service: ServiceProvider
  ) {
    this.ReasonS = "";
  }

  ionViewDidLoad() {
    console.log("Cancel Page");
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
    }
    this.JobId = this.navParams.get("JobNo");
  }

  ResonSelect(id) {
    this.ReasonS = id;
  }

  ColseModel() {
    this.viewCtrl.dismiss();
  }

  Confirm() {
    if (this.ReasonS) {
      var CancelReason;
      if (this.ReasonS == "1") {
        CancelReason = "Job no longer needed";
      } else if (this.ReasonS == "2") {
        CancelReason = "Price";
      } else if (this.ReasonS == "3") {
        CancelReason = "Date/time no longer work";
      } else if (this.ReasonS == "4") {
        CancelReason = "Issue with Pro";
      } else {
      }

      this.alert.showLoader("");
      var params = {
        user_id: this.UserId,
        job_id: this.JobId,
        reason: CancelReason,
      };
      console.log(params);
      this.service
        .CancelJob(params)
        .then((results) => this.HandleDispute(results));
    }
  }

  HandleDispute(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      var data = "Success";
      this.viewCtrl.dismiss(data);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }
}

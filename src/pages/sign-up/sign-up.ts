import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { ChooseLanguagePage } from "../choose-language/choose-language";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { TermsConditionPage } from "../terms-condition/terms-condition";

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html",
})
export class SignUpPage {
  tabBarElement: any;
  firstname: any;
  lastname: any;
  email: any;
  contact: any;
  password: any;
  conpasswor: any;
  howdid: any;
  receivemail: boolean;
  type: any;
  emailreceiv: any;
  referalcode: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public modalCtrl: ModalController
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
    this.receivemail = false;
    this.type = "1";
  }
  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "none";
    }
  }
  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "flex";
    }
  }

  ionViewDidLoad() {
    console.log("SignUp Page");
  }

  SignUp() {
    if (this.validate()) {
      if (this.validateEmail(this.email)) {
        this.alert.showLoader("");
        if (this.receivemail == true) {
          this.emailreceiv = "1";
        } else {
          this.emailreceiv = "0";
        }
        var params = {
          name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          mobile: this.contact,
          password: this.password,
          how_hear: this.howdid,
          receive_email: this.emailreceiv,
          referred_by: this.referalcode,
          type: "1",
        };
        console.log(params);
        this.service
          .Signup(params)
          .then((results) => this.HandleSignup(results));
      } else {
        this.alert.showAlert("Attention", "Please enter valid email!");
      }
    }
  }

  HandleSignup(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("success");
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  validate() {
    if (!this.firstname) {
      this.alert.showAlert("Attention", "Please enter valid First Name!");
      return false;
    } else if (!this.lastname) {
      this.alert.showAlert("Attention", "Please enter valid Last Name!");
      return false;
    } else if (!this.email) {
      this.alert.showAlert("Attention", "Please enter valid Email!");
      return false;
    } else if (!this.contact) {
      this.alert.showAlert("Attention", "Please enter valid Phone Number!");
      return false;
    } else if (!this.password) {
      this.alert.showAlert("Attention", "Please enter valid Password!");
      return false;
    } else if (!this.conpasswor) {
      this.alert.showAlert("Attention", "Please enter valid confirm password!");
      return false;
    } else if (this.conpasswor != this.password) {
      this.alert.showAlert("Attention", "Password should be match!");
      return false;
    } else if (this.password.length < 8) {
      this.alert.showAlert(
        "Attention",
        "Password must be atleast 8 charecter!"
      );
      return false;
    }
    return true;
  }

  validateEmail(Email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(Email) == false) {
      return false;
    }
    return true;
  }

  CreateAcc() {
    this.navCtrl.push(LoginPage);
  }
  Close() {
    this.navCtrl.setRoot(ChooseLanguagePage);
  }

  TermCondition() {
    let ConditionModal = this.modalCtrl.create(TermsConditionPage, {
      LogSign: "Signup",
    });
    ConditionModal.onDidDismiss((data) => {
      console.log(data);
    });
    ConditionModal.present();
  }
}

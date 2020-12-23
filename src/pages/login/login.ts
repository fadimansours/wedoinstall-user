import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { SignUpPage } from "../sign-up/sign-up";
import { ChooseLanguagePage } from "../choose-language/choose-language";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ConfigProvider } from "../../providers/config/config";
import { OneSignal } from "@ionic-native/onesignal";
import { TermsConditionPage } from "../terms-condition/terms-condition";
import { userService } from "../../providers/service/userService";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  passwordType: string = "password";
  passwordIcon: string = "md-eye";
  tabBarElement: any;
  email: any;
  password: any;
  DevicesId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    private config: ConfigProvider,
    public oneSignal: OneSignal,
    public modalCtrl: ModalController,
    public userService: userService,
    public creditService: creditServiceProvider
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
  }
  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "none";
    }
    this.oneSignal.getIds().then((ids) => {
      var playerid = JSON.stringify(ids["userId"]);
      var str = playerid.replace('"', "");
      this.DevicesId = str.replace('"', "");
      console.log("Device id is => " + this.DevicesId);
    });
  }
  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "flex";
    }
  }

  ionViewDidLoad() {
    console.log("Login Page");
  }

  HideShowPass() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon =
      this.passwordIcon === "md-eye-off" ? "md-eye" : "md-eye-off";
  }

  Login() {
    if (this.validate()) {
      this.alert.showLoader("");
      var params = {
        username: this.email,
        password: this.password,
        device_id: this.DevicesId,
      };
      console.log(params);
      this.service.Logins(params).then((results) => this.HandleLogin(results));
    }
  }

  HandleLogin(results) {
    console.log("login results", results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("success");
      localStorage.setItem("Trades_globe", JSON.stringify(results.user_data));
      localStorage.setItem(
        "user_credit",
        JSON.stringify(results.user_data.balance)
      );

      this.config.userlogin();
      this.creditService.getCreditPointsBalnce();
      this.userService.loadUserDetails();
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  validate() {
    if (!this.email) {
      this.alert.showAlert("Attention", "Please enter valid Email!");
      return false;
    } else if (!this.password) {
      this.alert.showAlert("Attention", "Please enter valid Password!");
      return false;
    }
    return true;
  }

  Signup() {
    this.navCtrl.setRoot(SignUpPage);
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

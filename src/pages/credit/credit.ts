import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { LearnmoreModalPage } from "../learnmore-modal/learnmore-modal";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { SocialSharing } from "@ionic-native/social-sharing";
import { ConfigProvider } from "../../providers/config/config";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";

@IonicPage()
@Component({
  selector: "page-credit",
  templateUrl: "credit.html",
})
export class CreditPage {
  Couponcode: any;
  UserData: any;
  UserId: any;
  ReferRal: any;
  tabBarElement: any;
  CreditPoint: any;
  creditBalance: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    private socialSharing: SocialSharing,
    public config: ConfigProvider,
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
    this.creditService.getCreditPointsBalnce();
    //this.CreditPoint = this.config.UserPoint;
  }
  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "flex";
    }
  }

  ionViewDidLoad() {
    console.log("Credit Page");
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
      this.ReferRal = this.UserData.referral_code;
    }
  }

  LearnMore() {
    let LearnMoreModal = this.modalCtrl.create(LearnmoreModalPage);
    LearnMoreModal.present();
  }
  coupon() {
    this.creditService.addCoupon(this.Couponcode);
  }
  /* Coupon() {
    this.alert.showLoader("");
    var params = {
      user_id: this.UserId,
      code: this.Couponcode,
    };
    console.log(params);
    this.service
      .CouponCode(params)
      .then((results) => this.HandleCoupon(results));
  } */
  /*  getCreditBalnce() {
    var params = {
      user_id: this.UserId,
    };
    console.log(params);
    this.service.getUserDetails(params).then((result: any) => {
      console.log(result.data[0]);
      let bal = JSON.parse(result.data[0].balance);
      this.creditBalance = bal;
      console.log("current balance", bal);
    });
  } */

  /* HandleCoupon(results) {
    console.log("coupon", results);
    console.log("coupon value", JSON.parse(results.percentage.percentage));
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.creditBalance =
        this.creditBalance + JSON.parse(results.percentage.percentage);
      var params = {
        credit: this.creditBalance,
        user_id: this.UserId,
      };
      this.service.updateCreditBalance(params).then((result: any) => {
        console.log("rsp", result);
        localStorage.setItem("user_credit", JSON.stringify(this.creditBalance));
        this.alert.showAlert("Error", result.ResponseMsg);
      });
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  } */

  ShareRefer() {
    var message =
      "Sign up for Tradesdlobe using my promo code " +
      '"' +
      this.ReferRal +
      '"' +
      " to get $25 off your first Tradesglobe";
    this.socialSharing
      .share(message, "", "", "")
      .then(() => {
        console.log("Success");
      })
      .catch(() => {
        console.log("Error");
      });
  }
}

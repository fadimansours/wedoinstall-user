import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { StartSplashPage } from "../start-splash/start-splash";
import { TranslateService } from "@ngx-translate/core";
import { ConfigProvider } from "../../providers/config/config";
import { TabsPage } from "../tabs/tabs";
import { ServiceProvider } from "../../providers/service/service";
import { OneSignal } from "@ionic-native/onesignal";

@IonicPage()
@Component({
  selector: "page-choose-language",
  templateUrl: "choose-language.html",
})
export class ChooseLanguagePage {
  language: any;
  currency: any;
  tabBarElement: any;
  DevicesId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private translate: TranslateService,
    private config: ConfigProvider,
    private service: ServiceProvider,
    public oneSignal: OneSignal
  ) {
    this.language = "en";
    this.currency = "ca";
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
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
    console.log("Choose-Language Page");
  }

  Next() {
    if (this.language === "ar") {
      this.platform.setDir("rtl", true);
      this.translate.setDefaultLang(this.language);
      this.config.Languagge = "rtl";
      this.NextClick();
    } else {
      this.platform.setDir("ltr", true);
      this.translate.setDefaultLang(this.language);
      this.config.Languagge = "ltr";
      this.NextClick();
    }
  }

  NextClick() {
    if (localStorage.getItem("Trades_globe")) {
      this.config.userlogin();
      let userDetail = JSON.parse(localStorage.getItem("Trades_globe"));
      this.oneSignal.getIds().then((ids) => {
        var playerid = JSON.stringify(ids["userId"]);
        var str = playerid.replace('"', "");
        this.DevicesId = str.replace('"', "");
        console.log("Device id is => " + this.DevicesId);
      });

      var params = {
        username: userDetail.email,
        password: userDetail.password,
        device_id: this.DevicesId,
      };
      console.log(params);
      this.service.Logins(params).then((results) => {
        results;
      });

      this.navCtrl.setRoot(TabsPage);
      console.log("started sucess");
    } else {
      this.navCtrl.push(StartSplashPage);
      console.log("started splash");
    }
  }
}

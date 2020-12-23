import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { RescueStreakPage } from "../rescue-streak/rescue-streak";
import { LearnmoreModalPage } from "../learnmore-modal/learnmore-modal";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { AdminChatPage } from "../admin-chat/admin-chat";
import { ConfigProvider } from "../../providers/config/config";

@IonicPage()
@Component({
  selector: "page-available-view",
  templateUrl: "available-view.html",
})
export class AvailableViewPage {
  saturation: any;
  tabBarElement: any;
  UserData: any;
  UserId: any;
  UserAddress: any;
  StreakList: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider
  ) {
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
    console.log("Available-View Page");
    if (this.config.UserAddress) {
      this.UserAddress = this.config.UserAddress;
    } else {
      this.UserAddress = "Add address";
    }
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
      this.saturation = this.UserData.point;
    }
    this.RendemPoint();
  }

  RendemPoint() {
    this.alert.showLoader("");
    var params = {
      user_id: this.UserId,
    };
    console.log(params);
    this.service
      .RendomPointGet(params)
      .then((results) => this.HendalRendomPoint(results));
  }

  HendalRendomPoint(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
    this.Streak();
  }

  Streak() {
    var params = {
      address: this.UserAddress,
    };
    console.log(params);
    this.service
      .GetStreak(params)
      .then((results) => this.HandleStreak(results));
  }

  HandleStreak(results) {
    console.log(results);
    if (results.ResponseCode == 1) {
      this.StreakList = results.data;
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  RescueStreak() {
    let rescueModal = this.modalCtrl.create(RescueStreakPage);
    rescueModal.present();
  }

  LearnMore() {
    let LearnMoreModal = this.modalCtrl.create(LearnmoreModalPage);
    LearnMoreModal.present();
  }

  AdminChat() {
    this.navCtrl.push(AdminChatPage);
  }
}

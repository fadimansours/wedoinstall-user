import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { AvailableViewPage } from "../available-view/available-view";
import { CreditPage } from "../credit/credit";
import { EditProfilePage } from "../edit-profile/edit-profile";
import { PaymentDetailPage } from "../payment-detail/payment-detail";
import { AddressDetailPage } from "../address-detail/address-detail";
import { ChooseLanguagePage } from "../choose-language/choose-language";
import { ConfigProvider } from "../../providers/config/config";
import { ConversationPage } from "../conversation/conversation";
import { SigninModalPage } from "../signin-modal/signin-modal";
import { TabsPage } from "../tabs/tabs";
import { AdminChatPage } from "../admin-chat/admin-chat";
import { MyorderPage } from "../myorder/myorder";
import { ServiceProvider } from "../../providers/service/service";
import { userService } from "../../providers/service/userService";
import { AlertProvider } from "../../providers/alert/alert";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  public userDetails: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public config: ConfigProvider,
    public service: ServiceProvider,
    public userService: userService,
    private alert: AlertProvider,
    public creditService: creditServiceProvider
  ) {}
  ionViewWillEnter() {}
  ngAfterViewInit() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "flex";
      });
    }
  }

  ionViewDidLoad() {
    console.log("Profile Page");
    this.alert.showLoader("");
    if (this.config.loginId) {
      this.creditService.getCreditPointsBalnce();
    } else {
      let modal = this.modalCtrl.create(SigninModalPage, { tepshow: "2" });
      modal.onDidDismiss((data) => {
        console.log(data);
        this.navCtrl.setRoot(TabsPage);
      });
      modal.present();
    }
    this.alert.dissmissLoader();
  }

  /*  public loadUserDetails() {
    var params = {
      user_id: this.config.loginId,
    };
    this.service.getUserDetails(params).then((result: any) => {
      if (result.data[0]) {
        this.userDetails = result.data[0];
      }

      console.log(this.userDetails);
    });
  }
 */
  Chat() {
    this.navCtrl.push(ConversationPage);
  }

  PointView() {
    this.navCtrl.push(AvailableViewPage);
  }

  Myorde() {
    this.navCtrl.push(MyorderPage);
  }

  CreditView() {
    this.navCtrl.push(CreditPage);
  }

  EditProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  Payment() {
    this.navCtrl.push(PaymentDetailPage);
  }

  Address() {
    this.navCtrl.push(AddressDetailPage);
  }

  Logout() {
    localStorage.clear();
    this.config.loginId = "";
    this.navCtrl.setRoot(ChooseLanguagePage);
  }

  AdminChat() {
    this.navCtrl.push(AdminChatPage);
  }
}

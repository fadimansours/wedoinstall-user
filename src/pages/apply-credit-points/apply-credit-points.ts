import { Component } from "@angular/core";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ConfigProvider } from "../../providers/config/config";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";
import { ServiceProvider } from "../../providers/service/service";
import { userService } from "../../providers/service/userService";

/**
 * Generated class for the ApplyCreditPointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-apply-credit-points",
  templateUrl: "apply-credit-points.html",
})
export class ApplyCreditPointsPage {
  couponcode: any;
  creditValue: number = 0;
  pointsValue: number = 0;
  myRange = { lower: 0, upper: this.creditService.creditBalance };
  creditBalance: any;
  jobDetail: any;
  type: any;
  creditOption1: boolean = true; //credit option
  creditOption2: boolean = false; //point option
  selectedPointSec: any;
  pointDiscount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider,
    public viewCtrl: ViewController,
    public creditService: creditServiceProvider,
    public userService: userService,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ApplyCreditPointsPage");
    this.jobDetail = this.navParams.get("jobData");
    this.type = this.navParams.get("type");
  }
  CloseModel() {
    this.viewCtrl.dismiss(0);
  }
  Continue() {
    if (this.creditOption1) {
      console.log(this.creditValue);
      var type = "credit";
      var credit = this.creditService.getCredit() - this.creditValue;
      this.creditService.updateCredit(credit);
      this.presentToast(this.creditValue + " " + "credit used");
      this.viewCtrl.dismiss(this.creditValue, type);
    }
    if (this.creditOption2) {
      var type = "point";
      let point = this.creditService.getPoints() - this.pointsValue;
      this.creditService.updatePoints(point);
      this.presentToast(this.pointsValue + " " + "points used");
      this.viewCtrl.dismiss(this.pointDiscount, type);
    }
  }

  toggleOption1() {
    this.creditOption1 = true;
    this.creditOption2 = false;
  }
  toggleOption2() {
    this.creditOption1 = false;
    this.creditOption2 = true;
  }

  pointSection(type, point, value) {
    if (this.config.UserPoint >= point) {
      this.selectedPointSec = type;
      this.pointsValue = point;
      this.pointDiscount = value;
    } else {
      this.presentToast("insufficient points");
    }
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom",
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  CreditView() {}
  PointView() {}
}

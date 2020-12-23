import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { ConfigProvider } from "../../providers/config/config";
import { ImageViewerController } from "ionic-img-viewer";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { RequestModelPage } from "../request-model/request-model";
import { TabsPage } from "../tabs/tabs";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: "page-confirm-jobdetail",
  templateUrl: "confirm-jobdetail.html",
})
export class ConfirmJobdetailPage {
  _imageViewerCtrl: ImageViewerController;
  tabBarElement: any;
  JobData: any;
  Srvname: any;
  Srvicon: any;
  Srvdate: any;
  Srvtime: any;
  Srvaddres: any;
  Srvdescri: any;
  Srvtype: any;
  attechment: any;
  mynewurl: any;
  newAttechmeny: any;
  UserId: any;
  CatogoryId: any;
  Attecphoto: any;
  Costtype: any;
  Costprice: any;
  CatogoryAdditionl: any;
  additionalRateDescription: any;
  deadline: any;
  isFlashDeal: any;
  realPrice: any;
  discount_percentage: any;
  pointsDiscount: any;
  couponDiscount: any;
  priceDescription: any;
  serviceName: any;
  mainCatId: any;
  pointsUsed: number;
  creditUsed: number;
  isStreak: any;
  providerId: any = "0";
  isPackage: boolean;
  packageData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    imageViewerCtrl: ImageViewerController,
    public config: ConfigProvider,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public modalCtrl: ModalController,
    public creditService: creditServiceProvider
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.newAttechmeny = [];
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }
  ionViewWillLeave() {}

  ionViewDidLoad() {
    console.log("Confirm-Jobdetail Page");
    this.JobData = this.navParams.get("Jobdata");
    this.isPackage = this.navParams.get("isPackage");
    if (!this.isPackage) {
      this.CatogoryAdditionl = this.JobData.JobFullD.additional_hourly_rate;
      this.Costtype = this.JobData.JobFullD.type;
      this.Srvname = this.JobData.JobFullD.name;
      this.Srvicon = this.JobData.JobFullD.icon;
      this.priceDescription = this.JobData.JobFullD.pricedescription;
      this.additionalRateDescription = this.JobData.JobFullD.additionaldescription;
      this.mainCatId = this.JobData.mainCatId;
    }
    if (this.isPackage) {
      this.packageData = this.navParams.get("packageData");
    }

    this.UserId = this.JobData.user_id;
    this.CatogoryId = this.JobData.service;
    this.Costprice = this.JobData.price;
    this.serviceName = this.JobData.serviceName;
    this.Srvdate = this.JobData.jdate;
    this.Srvtime = this.JobData.jtime;
    this.Srvaddres = this.JobData.address;
    this.Srvdescri = this.JobData.description;
    this.Srvtype = this.JobData.type;
    this.Attecphoto = this.JobData.attechment;
    var nativepath = this.JobData.attechment;
    this.isFlashDeal = this.JobData.isFlash;
    this.isStreak = this.JobData.isStreak;
    this.pointsUsed = this.JobData.pointsUsed;
    this.creditUsed = this.JobData.creditUsed;
    if (this.isStreak) {
      this.providerId = this.JobData.providerId;
    }

    if ((this.JobData.pointsDiscount && !this.isStreak) || !this.isFlashDeal) {
      this.pointsDiscount = this.JobData.pointsDiscount;
    }
    if ((this.JobData.couponDiscount && !this.isStreak) || !this.isFlashDeal) {
      this.couponDiscount = this.JobData.couponDiscount;
    }
    if (this.isFlashDeal || this.isStreak) {
      this.discount_percentage = this.JobData.discount_percentage;
      this.realPrice = this.JobData.JobFullD.price;
    }

    if (this.JobData.deadlines) {
      this.deadline = this.JobData.deadlines;
    }
    if (nativepath) {
      this.attechment = nativepath.split(",");
    }
    if (this.attechment) {
      this.mynewurl = "1";
      for (var i = 0; i < this.attechment.length; i++) {
        if (
          this.attechment[i].substr(this.attechment[i].lastIndexOf(".") + 1) ==
          "png"
        ) {
          this.newAttechmeny.push({
            filename: this.attechment[i],
            type: "1",
          });
        } else if (
          this.attechment[i].substr(this.attechment[i].lastIndexOf(".") + 1) ==
          "mp4"
        ) {
          this.newAttechmeny.push({
            filename: this.attechment[i],
            type: "2",
          });
        }
      }
    } else {
      this.mynewurl = "0";
    }
  }

  Continue() {
    this.alert.showLoader("");
    if (this.Srvtype == "1") {
      let params = {
        user_id: this.UserId,
        providerId: this.isStreak ? this.providerId : "0",
        mainCatId: this.mainCatId,
        service: this.CatogoryId,
        serviceName: this.serviceName,
        jdate: this.Srvdate.toString(),
        jtime: this.Srvtime.toString(),
        description: this.Srvdescri,
        qty: "0",
        address: this.Srvaddres,
        price: this.Costprice,
        attechment: this.Attecphoto.toString(),
        type: this.Srvtype,
        isFlashDeal: this.isFlashDeal,
        isStreak: this.isStreak,
        discount_percentage: this.discount_percentage,
        pointsDiscount: this.pointsDiscount,
        couponDiscount: this.couponDiscount,
        isRefferal: 0,
        refferedBy: 0,
        last_update: this.getTimeStamp(),
        isPackage: 0,
      };
      console.log(params);
      this.service
        .RequestJob(params)
        .then((results) => this.HandleRequest(results));
    } else if (this.Srvtype == "2") {
      let params = {
        user_id: this.UserId,
        providerId: this.isStreak ? this.providerId : "0",
        mainCatId: this.mainCatId,
        service: this.CatogoryId,
        serviceName: this.serviceName,
        jdate: this.Srvdate.toString(),
        jtime: this.Srvtime.toString(),
        description: this.Srvdescri,
        qty: "0",
        address: this.Srvaddres,
        price: "",
        attechment: this.Attecphoto.toString(),
        type: this.Srvtype,
        deadLine: this.deadline,
        isFlashDeal: false,
        isStreak: false,
        pointsDiscount: this.pointsDiscount,
        couponDiscount: this.couponDiscount,
        isRefferal: 0,
        refferedBy: 0,
        last_update: this.getTimeStamp(),
        isPackage: 0,
      };

      this.service
        .RequestJob(params)
        .then((results) => this.HandleRequest(results));
    } else if (this.Srvtype == 3) {
      let params = {
        user_id: this.UserId,
        providerId: this.JobData.provider_id,
        mainCatId: 0,
        service: null,
        serviceName: this.serviceName,
        jdate: this.Srvdate.toString(),
        jtime: this.Srvtime.toString(),
        description: this.Srvdescri,
        qty: "0",
        address: this.Srvaddres,
        price: this.isPackage ? this.JobData.price : "",
        attechment: this.Attecphoto.toString(),
        type: "2",
        deadLine: this.deadline,
        isFlashDeal: false,
        isStreak: false,
        pointsDiscount: this.pointsDiscount,
        couponDiscount: this.couponDiscount,
        isRefferal: 0,
        refferedBy: 0,
        last_update: this.getTimeStamp(),
        isPackage: 1,
      };

      console.log("package details", params);
      this.service
        .RequestJob(params)
        .then((results) => this.handlePackage(results));
    }
  }
  handlePackage(result) {
    console.log(result);
    this.alert.dissmissLoader();
    if (result.ResponseCode == 1) {
      var params = {
        id: this.packageData.id,
        job_id: result.job_id,
      };
      console.log("package id ", params);
      this.service.updateCustomePackage(params).then((results: any) => {
        if (results.ResponseCode == 1) {
          let RequestModel = this.modalCtrl.create(RequestModelPage);
          RequestModel.onDidDismiss((data) => {
            console.log(data);
            if (data && data == "Done") {
              this.navCtrl.setRoot(TabsPage);
            }
          });
          RequestModel.present();
        } else {
          this.alert.showAlert("Error", results.ResponseMsg);
        }
      });
    }
  }

  HandleRequest(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      if (this.pointsUsed > 0) {
        this.creditService.updatePoints(
          this.creditService.getPoints() - this.pointsUsed
        );
      }
      if (this.creditUsed > 0) {
        this.creditService.updateCredit(
          this.creditService.getCredit() - this.creditUsed
        );
      }

      let RequestModel = this.modalCtrl.create(RequestModelPage);
      RequestModel.onDidDismiss((data) => {
        console.log(data);
        if (data && data == "Done") {
          this.navCtrl.setRoot(TabsPage);
        }
      });
      RequestModel.present();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }
  getTimeStamp() {
    var time = moment();
    var time2 = moment().calendar();
    var time_format = time.format("MMM Do, h:mm a");
    console.log(time_format);
    console.log(time2);
    return time_format;
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  dateSet(dt) {
    var nd = new Date(dt + "T00:00:00");

    var th = nd.toString();
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var years = th.slice(11, 15);
    return day + ", " + month + " " + dates + ", " + years;
  }
}

import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
  ToastController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { ConfigProvider } from "../../providers/config/config";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { ImageViewerController } from "ionic-img-viewer";
import { CalanderPage } from "../calander/calander";
import { AddressDetailPage } from "../address-detail/address-detail";
import { TabsPage } from "../tabs/tabs";
import { SigninModalPage } from "../signin-modal/signin-modal";
import { ConfirmJobdetailPage } from "../confirm-jobdetail/confirm-jobdetail";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";
import { MainCatergoryPage } from "../main-catergory/main-catergory";

@IonicPage()
@Component({
  selector: "page-request-job",
  templateUrl: "request-job.html",
})
export class RequestJobPage {
  _imageViewerCtrl: ImageViewerController;
  CatogoryId: any;
  CatogoryName: any;
  Addres: any;
  Dates1: any;
  Dates2: any;
  Dates3: any;
  Times: any;
  Qunty: any;
  Description: any;
  UserData: any;
  UserId: any;
  MyImage1: any;
  MyImage2: any;
  mynewurl: any;
  ImageUrl1: any;
  ImageUrl2: any;
  VideoUrl1: string;
  VideoUrl2: string;
  AttechMedia: any;
  CatogoryPrice: any;
  CatogoryDesc: any;
  discount: any = 0;
  CatogoryImage: any;
  CatogoryPoint: any;
  CatogoryHourly: any;
  CatogorySqf: any;
  CatogoryFlatrate: any;
  priceDescription: any;
  CatogoryAdditionl: any;
  serviceType: any;
  alldate: any;
  Time1Hor: any;
  Time2Hor: any;
  Time3Hor: any;

  Date1Show: any;
  Date2Show: any;
  Date3Show: any;
  dateCount: any;
  DateLangh: any;
  Dates1Pars: any;
  Dates2Pars: any;
  Dates3Pars: any;
  Costprice: any;
  CatogoryLogo: any;
  atoda: any;
  deadlines: any;
  realCost: any;
  isFlash: boolean = false;

  couponCode: any;
  selectedPointSec: any;
  pointsValue: number = null;
  pointDiscount: number = null;
  creditValue: number;
  couponValue: number = null;
  couponName: any;
  showInputCouponBox: boolean = false;
  additionalCostDescription: any;
  mainCatId: any;
  expireDate: any;

  selectedPointSec1: boolean = false;
  selectedPointSec2: boolean = false;
  selectedPointSec3: boolean = false;
  selectedPointSec4: boolean = false;
  isStreak: boolean = false;
  sellingLimit: any;
  providerId: any = "0";
  isPackage: boolean = false;
  catData: any;
  packageData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private transfer: FileTransfer,
    public config: ConfigProvider,
    private fileChooser: FileChooser,
    public FilePath: FilePath,
    imageViewerCtrl: ImageViewerController,
    public modalCtrl: ModalController,
    public creditService: creditServiceProvider,
    private toastCtrl: ToastController
  ) {
    this.Date1Show = "1";
    this.mynewurl = "0";
    this.DateLangh = 0;
    this.AttechMedia = [];
    this._imageViewerCtrl = imageViewerCtrl;
    this.alldate = [];
    this.dateCount = [];
    this.Times = [];
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }
  ionViewWillEnter() {
    if (this.config.loginId) {
      if (localStorage.getItem("Trades_globe")) {
        this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
        this.UserId = this.UserData.id;
      }
    } else {
      let modal = this.modalCtrl.create(SigninModalPage, { tepshow: "1" });
      modal.onDidDismiss((data) => {
        console.log(data);
        this.navCtrl.setRoot(TabsPage);
      });
      modal.present();
    }
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "flex";
      });
    }
  }

  ionViewDidLoad() {
    console.log("Request-Job Page");
    this.serviceType = this.navParams.get("type");
    this.isPackage = this.navParams.get("isPackage");
    this.catData = this.navParams.get("CatData");
    var mainCatData = this.navParams.get("mainCatData");
    var Flsdeal = this.navParams.get("flash");
    var streak = this.navParams.get("streak");

    console.log("service type", this.serviceType);
    console.log("sub cat", this.catData);
    console.log("main cat", mainCatData);
    console.log("flash", Flsdeal);

    if (this.catData.picture) {
      this.CatogoryImage = this.catData.picture;
    } else {
      if (!this.isPackage) {
        this.CatogoryImage = mainCatData.image;
      } else {
        this.CatogoryImage = null;
      }
    }

    if (!this.isPackage) {
      if (this.catData.icon) {
        this.CatogoryLogo = this.catData.icon;
      } else {
        this.CatogoryImage = mainCatData.icon;
      }
      this.mainCatId = mainCatData.id;
      this.CatogoryId = this.catData.id;
      this.CatogoryAdditionl = this.catData.additional_hourly_rate;
      this.additionalCostDescription = this.catData.additionaldescription;
      this.CatogoryPoint = this.catData.point;
      this.CatogoryHourly = this.catData.hourly;
      this.CatogorySqf = this.catData.SQF;
      this.CatogoryFlatrate = this.catData.flat_rate;
      this.priceDescription = this.catData.pricedescription;
    }

    console.log("service data", this.catData);
    console.log("service data flash", Flsdeal);

    this.CatogoryName = this.catData.name;
    this.CatogoryDesc = this.catData.description;
    this.Costprice = this.catData.price;

    if (Flsdeal) {
      this.isFlash = true;
      this.realCost = this.catData.price;
      this.discount = Flsdeal.discount_percentage;
      let DiscoCost = (this.Costprice / 100) * this.discount;
      this.Costprice = this.Costprice - DiscoCost;
      this.expireDate = Flsdeal.end_date;
    }

    if (streak) {
      this.isStreak = true;
      this.realCost = this.catData.price;
      this.discount = streak.discount_percentage;
      let DiscoCost = (this.Costprice / 100) * this.discount;
      this.Costprice = this.Costprice - DiscoCost;
      this.expireDate = streak.end_date;
      this.sellingLimit = streak.selling_limit;
      this.Addres = streak.address;
      this.providerId = streak.provider_id;

      this.alldate[0] = streak.end_date;
      this.Times[0] = streak.workTime;
    }

    if (this.isPackage) {
      this.packageData = this.navParams.get("packageData");
      this.alldate[0] = this.catData.end_date;
      this.Times[0] = this.catData.time;
      this.priceDescription = "Total Rate";
      this.providerId = this.catData.provider_id;
    }

    // if (localStorage.getItem('Trades_globe')) {
    //   this.UserData = JSON.parse(localStorage.getItem('Trades_globe'));
    //   this.UserId = this.UserData.id
    // }
  }
  next() {
    this.navCtrl.push(MainCatergoryPage, { Jobdata: 0 });
  }

  Continue() {
    if (this.validate()) {
      if (this.ImageUrl1) {
        this.AttechMedia.push(this.ImageUrl1);
      }
      if (this.ImageUrl2) {
        this.AttechMedia.push(this.ImageUrl2);
      }
      if (this.VideoUrl1) {
        this.AttechMedia.push(this.VideoUrl1);
      }
      if (this.VideoUrl2) {
        this.AttechMedia.push(this.VideoUrl2);
      }
      if (this.serviceType == "1") {
        // this.alert.showLoader("")
        let params = {
          user_id: this.UserId,
          providerId: this.providerId,
          mainCatId: this.mainCatId,
          service: this.CatogoryId,
          serviceName: this.CatogoryName,
          jdate: this.alldate,
          jtime: this.Times,
          description: this.Description,
          qty: "0",
          address: this.Addres,
          price: this.Costprice,
          attechment: this.AttechMedia.toString(),
          type: this.serviceType,
          isFlash: this.isFlash,
          discount_percentage: this.discount,
          // attechment: this.AttechMedia.toString(),
          JobFullD: this.catData,
          pointsDiscount: this.pointDiscount,
          couponDiscount: this.couponValue,
          pointsUsed: this.pointsValue,
          creditUsed: this.creditValue,
          deadlines: null,
          isStreak: this.isStreak,
        };
        this.navCtrl.push(ConfirmJobdetailPage, {
          Jobdata: params,
          isPackage: false,
        });
        console.log("fixed job data", params);
      } else if (this.serviceType == "2") {
        let params = {
          user_id: this.UserId,
          mainCatId: this.mainCatId,
          service: this.CatogoryId,
          serviceName: "custom job",
          jdate: this.alldate,
          jtime: this.Times,
          description: this.Description,
          qty: "0",
          address: this.Addres,
          price: this.Costprice,
          attechment: this.AttechMedia.toString(),
          type: this.serviceType,
          pointsUsed: this.pointsValue,

          // attechment: this.AttechMedia.toString(),
          JobFullD: this.catData,
          deadline: this.deadlines,
          pointsDiscount: this.pointDiscount,
          couponDiscount: this.couponValue,
          creditUsed: this.creditValue,
        };
        this.navCtrl.push(ConfirmJobdetailPage, {
          Jobdata: params,
          isPackage: false,
        });
        console.log("quote job data", params);
      } else if (this.serviceType == 3) {
        let params = {
          user_id: this.UserId,
          provider_id: this.catData.provider_id,
          mainCatId: null,
          service: null,
          serviceName: this.catData.serviceName,
          jdate: this.alldate,
          jtime: this.Times,
          description: this.Description,
          address: this.Addres,
          price: this.Costprice,
          attechment: this.AttechMedia.toString(),
          type: 3,
          pointsUsed: null,
          JobFullD: this.atoda,
          deadline: this.deadlines,
          pointsDiscount: null,
          couponDiscount: null,
          creditUsed: null,
        };
        this.navCtrl.push(ConfirmJobdetailPage, {
          Jobdata: params,
          isPackage: true,
          packageData: this.packageData,
        });
        console.log("package job data", params);
        console.log("packageDataa", this.packageData);
      }
    }
  }

  HandleRequest(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.Dates1 = "";
      this.Dates2 = "";
      this.Dates3 = "";
      this.Times = "";
      this.Description = "";
      this.Addres = "";
      this.Qunty = "";
      this.AttechMedia = "";
      this.ImageUrl1 = "";
      this.ImageUrl2 = "";
      this.VideoUrl1 = "";
      this.VideoUrl2 = "";
      this.mynewurl = "0";
      this.alert.showAlert("Success", results.ResponseMsg);
      this.navCtrl.pop();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  Attechfile(photo) {
    console.log(photo);
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Choose image from',
      buttons: [
        {
          text: "Camera",
          icon: "camera",
          role: "destructive",
          handler: () => {
            console.log("Camera clicked");
            this.launchCamera("camera", photo);
          },
        },
        {
          text: "Gallery",
          icon: "grid",
          handler: () => {
            this.launchCamera("gallery", photo);
            console.log("Gallery clicked");
          },
        },
        // , {
        //   text: 'Video', icon: 'videocam',
        //   handler: () => {
        //     this.VideoUplod()
        //     console.log('Video clicked');
        //   }
        // }
      ],
    });
    actionSheet.present();
  }

  launchCamera(source, photo) {
    console.log(source);
    console.log(photo);
    const options: CameraOptions = {
      quality: 80,
      sourceType:
        source == "camera"
          ? this.camera.PictureSourceType.CAMERA
          : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 800,
      correctOrientation: true,
      allowEdit: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = "data:image/png;base64," + imageData;
      if (photo == "img1") {
        this.MyImage1 = base64Image;
        this.uploadImg(this.MyImage1, "img1");
      } else if (photo == "img2") {
        this.MyImage2 = base64Image;
        this.uploadImg(this.MyImage2, "img2");
      } else {
      }
    });
  }

  uploadImg(MyImage, newimage) {
    this.alert.showLoader("");
    var random = Math.floor(Math.random() * 100);
    let options: FileUploadOptions = {
      fileKey: "image",
      fileName: "image_" + random + ".png",
      chunkedMode: false,
      mimeType: "image/png",
    };
    console.log(options);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer
      .upload(MyImage, "http://tradesglobeinc.com/api/imageupload.php", options)
      .then(
        (data) => {
          console.log(data);
          var imgdata = JSON.parse(data.response);
          console.log(imgdata);
          this.alert.dissmissLoader();
          if (imgdata.ResponseCode == 1) {
            if (newimage == "img1") {
              this.ImageUrl1 = imgdata.image_url;
              console.log(this.ImageUrl1);
            } else if (newimage == "img2") {
              this.ImageUrl2 = imgdata.image_url;
              console.log(this.ImageUrl2);
            } else {
            }
          } else {
          }
        },
        (err) => {
          console.log(err);
          this.alert.dissmissLoader();
        }
      );
  }

  VideoUplod(vidio) {
    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        var nativepath = result;
        var fileExtension = nativepath.substr(nativepath.lastIndexOf(".") + 1);
        console.log(nativepath);
        console.log(fileExtension);
        if (vidio == "vdo1") {
          nativepath;
          this.UploadVdo(nativepath, "vdo1");
        } else if (vidio == "vdo2") {
          nativepath;
          this.UploadVdo(nativepath, "vdo2");
        } else {
        }
      });
    });
  }

  UploadVdo(nativepath, vidio) {
    this.alert.showLoader("");
    var random = Math.floor(Math.random() * 100);
    let options: FileUploadOptions = {
      fileKey: "image",
      fileName: "Vedio_" + random + ".mp4",
      chunkedMode: false,
      mimeType: "video/mp4",
    };
    console.log(options);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer
      .upload(
        nativepath,
        "http://tradesglobeinc.com/api/imageupload.php",
        options
      )
      .then(
        (data) => {
          console.log(data);
          var imgdata = JSON.parse(data.response);
          console.log(imgdata);
          this.alert.dissmissLoader();
          if (imgdata.ResponseCode == 1) {
            if (vidio == "vdo1") {
              this.VideoUrl1 = imgdata.image_url;
              console.log(this.VideoUrl1);
            } else if (vidio == "vdo2") {
              this.VideoUrl2 = imgdata.image_url;
              console.log(this.VideoUrl2);
            } else {
            }
          }
        },
        (err) => {
          console.log(err);
          this.alert.dissmissLoader();
        }
      );
  }

  validate() {
    if (!this.Addres) {
      this.alert.showAlert("Attention", "Please enter valid Address!");
      return false;
    } else if (!this.Times) {
      this.alert.showAlert("Attention", "Please select valid Time!");
      return false;
    } else if (!this.alldate.length) {
      this.alert.showAlert("Attention", "Please enter valid Date!");
      return false;
    } else if (!this.serviceType) {
      this.alert.showAlert("Attention", "Please select valid Type!");
      return false;
    }
    return true;
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  serviceTypeStatus(id) {
    this.serviceType = id;
  }

  AddressSelect() {
    let AddressModal = this.modalCtrl.create(AddressDetailPage, {
      selecadd: "selec",
    });
    AddressModal.onDidDismiss((data) => {
      console.log(data);
      if (data) {
        this.ngAfterViewInit();
        this.Addres = data;
      }
    });
    AddressModal.present();
  }

  SelectTimeDate(btid) {
    console.log(btid);
    let CalenterModal = this.modalCtrl.create(CalanderPage, { type: 0 });
    CalenterModal.onDidDismiss((data) => {
      console.log("dates here", data);
      if (data) {
        if (btid == "1") {
          this.Dates1 = data.date;
          this.Dates1Pars = data.parsdate;
          this.Time1Hor = data.time;
          this.Date1Show = "0";
          this.Date2Show = "1";

          this.alldate[0] = this.Dates1Pars;
          this.Times[0] = this.Time1Hor;
        } else if (btid == "2") {
          this.Dates2 = data.date;
          this.Dates2Pars = data.parsdate;
          this.Time2Hor = data.time;
          this.Date2Show = "0";
          this.Date3Show = "1";
          this.alldate[1] = this.Dates2Pars;
          this.Times[1] = this.Time2Hor;
        } else if (btid == "3") {
          this.Dates3 = data.date;
          this.Dates3Pars = data.parsdate;
          this.Time3Hor = data.time;
          this.Date3Show = "0";

          this.alldate[2] = this.Dates3Pars;
          this.Times[2] = this.Time3Hor;
        }
        this.CountDate();
        console.log("times", this.Times);
        console.log("days", this.alldate);
      }
    });
    CalenterModal.present();
  }

  DateDelet(id) {
    if (id == "1") {
      /*  this.Dates1 = "";
      this.Dates1Pars = "";
      this.Time1Hor = ""; */
      this.Date1Show = "1";
      this.alldate.splice(0, 1);
      this.Times.splice(0, 1);
      /* this.Date2Show = "0";
      this.Date3Show = "0"; */
    } else if (id == "2") {
      /*  this.Dates2 = "";
      this.Dates2Pars = "";
      this.Time2Hor = ""; */
      this.Date2Show = "1";
      this.alldate.splice(1, 1);
      this.Times.splice(1, 1);
      /* this.Date3Show = "0"; */
    } else if (id == "3") {
      /*  this.Dates3 = "";
      this.Dates3Pars = "";
      this.Time3Hor = ""; */
      this.alldate.splice(2, 1);
      this.Times.splice(2, 1);
      this.Date3Show = "1";
    }
    this.CountDate();
    console.log("times", this.Times);
    console.log("days", this.alldate);
  }

  CountDate() {
    this.dateCount = [];
    if (this.Dates1) {
      this.dateCount.push(this.Dates1);
    }
    if (this.Dates2) {
      this.dateCount.push(this.Dates2);
    }
    if (this.Dates3) {
      this.dateCount.push(this.Dates3);
    }
    console.log("dates list", this.dateCount);
    this.DateLangh = this.dateCount.length;
  }

  public addCoupon() {
    this.alert.showLoader("");
    var params = {
      user_id: this.config.loginId,
      code: this.couponCode,
    };
    console.log(params);
    this.service
      .CouponCode(params)
      .then((results) => this.HandleCoupon(results));
  }

  public HandleCoupon(results) {
    console.log("coupon", results);

    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("coupon value", JSON.parse(results.percentage.percentage));
      this.couponValue = JSON.parse(results.percentage.percentage);
      this.couponName = results.percentage.name;
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  pointSection1(point, value) {
    if (this.creditService.getPoints() >= point) {
      this.selectedPointSec1 = !this.selectedPointSec1;
      this.selectedPointSec2 = false;
      this.selectedPointSec3 = false;
      this.selectedPointSec4 = false;
      if (this.selectedPointSec1) {
        this.pointsValue = point;
        this.pointDiscount = value;
      } else {
        this.pointsValue = null;
        this.pointDiscount = null;
      }
    } else {
      this.presentToast("insufficient points");
    }
    console.log("points discount", this.pointDiscount);
  }
  pointSection2(point, value) {
    if (this.creditService.getPoints() >= point) {
      this.selectedPointSec2 = !this.selectedPointSec2;
      this.selectedPointSec1 = false;
      this.selectedPointSec3 = false;
      this.selectedPointSec4 = false;
      if (this.selectedPointSec2) {
        this.pointsValue = point;
        this.pointDiscount = value;
      } else {
        this.pointsValue = null;
        this.pointDiscount = null;
      }
    } else {
      this.presentToast("insufficient points");
    }
    console.log("points discount", this.pointDiscount);
  }
  pointSection3(point, value) {
    if (this.creditService.getPoints() >= point) {
      this.selectedPointSec2 = false;
      this.selectedPointSec1 = false;
      this.selectedPointSec3 = !this.selectedPointSec3;
      this.selectedPointSec4 = false;

      if (this.selectedPointSec3) {
        this.pointsValue = point;
        this.pointDiscount = value;
      } else {
        this.pointsValue = null;
        this.pointDiscount = null;
      }
    } else {
      this.presentToast("insufficient points");
    }
    console.log("points discount", this.pointDiscount);
  }
  pointSection4(point, value) {
    if (this.creditService.getPoints() >= point) {
      this.selectedPointSec2 = false;
      this.selectedPointSec1 = false;
      this.selectedPointSec3 = false;
      this.selectedPointSec4 = !this.selectedPointSec4;
      if (this.selectedPointSec4) {
        this.pointsValue = point;
        this.pointDiscount = value;
      } else {
        this.pointsValue = null;
        this.pointDiscount = null;
      }
    } else {
      this.presentToast("insufficient points");
    }
    console.log("points discount", this.pointDiscount);
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
  showInputCoupon() {
    this.showInputCouponBox = !this.showInputCouponBox;
  }
}

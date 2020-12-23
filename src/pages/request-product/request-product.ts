import { Component } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FileChooser } from "@ionic-native/file-chooser";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions,
} from "@ionic-native/file-transfer";
import {
  ActionSheetController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from "ionic-angular";
import { ImageViewerController } from "ionic-img-viewer";
import { AlertProvider } from "../../providers/alert/alert";
import { ConfigProvider } from "../../providers/config/config";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";
import { ServiceProvider } from "../../providers/service/service";
import { FilePath } from "@ionic-native/file-path";
import { AddressDetailPage } from "../address-detail/address-detail";
import { CalanderPage } from "../calander/calander";
import { RequestModelPage } from "../request-model/request-model";
import { TabsPage } from "../tabs/tabs";
import * as moment from "moment";

/**
 * Generated class for the RequestProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-request-product",
  templateUrl: "request-product.html",
})
export class RequestProductPage {
  _imageViewerCtrl: ImageViewerController;
  Dates1: any;
  Dates2: any;
  Dates3: any;
  Times: any;
  address: any;
  cartList: any = [];

  Date1Show: any;
  Date2Show: any;
  Date3Show: any;
  dateCount: any;
  DateLangh: any;
  Dates1Pars: any;
  Dates2Pars: any;
  Dates3Pars: any;
  alldate: any = [];
  Time1Hor: any;
  Time2Hor: any;
  Time3Hor: any;

  description: any;
  imageUrl1: any;
  imageUrl2: any;
  videoUrl1: any;
  videoUrl2: any;
  myImage1: string;
  myImage2: any;
  CatogoryImage: any;
  mynewurl: string;
  AttechMedia: any[];
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
    public creditService: creditServiceProvider
  ) {
    this.Date1Show = "1";
    this.mynewurl = "0";
    this.DateLangh = 0;
    this.AttechMedia = [];
    this._imageViewerCtrl = imageViewerCtrl;

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
  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "flex";
      });
    }
  }

  ionViewDidLoad() {
    this.cartList = this.navParams.get("cart");
  }

  AddressSelect() {
    let AddressModal = this.modalCtrl.create(AddressDetailPage, {
      selecadd: "selec",
    });
    AddressModal.onDidDismiss((data) => {
      console.log(data);
      if (data) {
        this.ngAfterViewInit();
        this.address = data;
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
        this.myImage1 = base64Image;
        this.uploadImg(this.myImage1, "img1");
      } else if (photo == "img2") {
        this.myImage2 = base64Image;
        this.uploadImg(this.myImage2, "img2");
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
              this.imageUrl1 = imgdata.image_url;
              console.log(this.imageUrl1);
            } else if (newimage == "img2") {
              this.imageUrl2 = imgdata.image_url;
              console.log(this.imageUrl2);
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
              this.videoUrl1 = imgdata.image_url;
              console.log(this.videoUrl1);
            } else if (vidio == "vdo2") {
              this.videoUrl2 = imgdata.image_url;
              console.log(this.videoUrl2);
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

  validate() {
    if (!this.address) {
      this.alert.showAlert("Attention", "Please enter valid Address!");
      return false;
    } else if (!this.Times) {
      this.alert.showAlert("Attention", "Please select valid Time!");
      return false;
    } else if (!this.alldate.length) {
      this.alert.showAlert("Attention", "Please enter valid Date!");
      return false;
    }
    return true;
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
  calTotal() {}

  getUnitPrice(item) {
    var installationPrice = 0;
    var disposalPrice = 0;
    var deliveryPrice = 0;
    var productPrice = item.initialPrice;
    if (item.withInstallation) {
      installationPrice = item.installationCharge;
    }
    if (item.withDisposal) {
      disposalPrice = item.disposalCharge;
    }
    if (item.withDelivery) {
      deliveryPrice = item.deliveryCharge;
    }
    item.productPrice =
      productPrice + installationPrice + disposalPrice + deliveryPrice;

    return item.productPrice;
  }

  Continue() {
    let total = 0;
    this.cartList.forEach((item) => {
      total = total + item.productPrice * item.quantity;
    });

    let params = {
      user_id: this.config.loginId,
      jdate: this.alldate,
      totalPrice: total,
      jtime: this.Times,
      description: this.description,
      address: this.address,
      attechment: this.AttechMedia.toString(),
      serviceName: "Product Order",
      type: 4,
      last_update: this.getTimeStamp(),
      pointsDiscount: 0,
      couponDiscount: 0,
      discount_percentage: 0,
      qty: this.cartList.length,
    };
    this.service.requestProduct(params).then((result: any) => {
      console.log(result);
      if (result.ResponseCode === "1") {
        this.handleRequest(result.job_id);
      }
    });
  }

  handleRequest(jobId) {
    var i = 0;
    this.cartList.forEach((item) => {
      let params = {
        job_id: jobId,
        user_id: this.config.loginId,
        productName: item.productName,
        vendorName: item.vendorName,
        productId: item.productId,
        merchantId: item.merchant_id,
        storeNumber: item.store_number,
        quantity: item.quantity,
        withDisposal: item.withDisposal ? 1 : 0,
        withDelivery: item.withDelivery ? 1 : 0,
        withInstallation: item.withInstallation ? 1 : 0,
        totalPrice: item.totalPrice,
      };
      console.log("item param", params);
      this.service.addOrder(params).then((result) => {
        console.log("item added rsult", result);
        i++;
        if (i == this.cartList.length) {
          let cart = [];
          localStorage.setItem("cart", JSON.stringify(cart));
          this.sucessModal;
        }
      });
    });
  }

  sucessModal() {
    let RequestModel = this.modalCtrl.create(RequestModelPage);
    RequestModel.onDidDismiss((data) => {
      console.log(data);
      if (data && data == "Done") {
        this.navCtrl.setRoot(TabsPage);
      }
    });
    RequestModel.present();
  }

  getTimeStamp() {
    var time = moment();
    var time2 = moment().calendar();
    var time_format = time.format("MMM Do, h:mm a");
    console.log(time_format);
    console.log(time2);
    return time_format;
  }
}

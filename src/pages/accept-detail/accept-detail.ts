import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController,
  ActionSheetController,
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { ChatPage } from "../chat/chat";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ConfigProvider } from "../../providers/config/config";
import { ImageViewerController } from "ionic-img-viewer";
import { ReschedulePage } from "../reschedule/reschedule";
import { ReviewPage } from "../review/review";
import { CancelPage } from "../cancel/cancel";
import { CallNumber } from "@ionic-native/call-number";
import { SuccessPage } from "../success/success";
import { QuoteDetailPage } from "../quote-detail/quote-detail";
import { CalanderPage } from "../calander/calander";
import { ApplyCreditPointsPage } from "../apply-credit-points/apply-credit-points";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-accept-detail",
  templateUrl: "accept-detail.html",
})
export class AcceptDetailPage {
  [x: string]: any;
  _imageViewerCtrl: ImageViewerController;
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  lat: number;
  lang: number;
  tabBarElement: any;
  Acceptdata: any;
  JobNo: any;
  mainCatIcon: any;
  mainCatName: any;
  ServiceName: any;
  UserName: any;
  Address: any;
  Datee: any;
  Timee: any;
  Description: any;
  UserData: any;
  UserId: any;
  providerId: any;
  providerName: any;
  WorkStatus: any;
  UserNamedefult: any;
  ImageUrl: any;
  VideoUrl: any;
  mynewurl: any;
  MyImage: string;
  CompletDetail: any;
  JobDate: any;
  JobTime: any;
  PaymentStatus: any;
  attechment: any;
  newAttechmeny: any;
  TimesSplit: any;
  IsReview: any;
  ServiceIcon: any;
  AditionPrice: number;
  ServicePrice: number;
  ServiceType: any;
  HorlyQuote: any;
  myRating: any;
  CompleteJb: any;
  PaymentType: any;
  accepted_date: any;
  accepted_date1: any;
  estimateArrival;
  quoteDetail: any;
  QuoteId: any;
  QuoteDataList: any = [];
  timeStamp;

  qstatus: any;
  recipt: any;
  grandTotal = 0;
  jobId: any;
  workType: number;
  priceDescription: any;
  additionRateTotal: number;
  labourTotal: number;
  subTotal: number;
  tax: number;
  taxValue: number;
  discount: any;
  discountPercentage: any;
  additionCostNote: any;
  finalJobNote: any;
  providerMobile: string;
  assignedTec: any;
  assignedTecId: any;
  assignedTecImage: any;
  providerImage: any;

  creditUsed: number;
  pointsUsed: number;

  additionalRatePrice: number;
  additionalRateDescription: any;
  discountedPrice: any;
  isFlashDeal: any;

  workMedia: any = [];
  completedMedia: any = [];
  preMedia: any = [];
  requestedTimeStamp;
  acceptedTimeStamp;
  progressTimeStamp;
  enRouteTimeStamp;
  completedTimeStamp;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Geolocation: Geolocation,
    private alertCtrl: AlertController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider,
    imageViewerCtrl: ImageViewerController,
    public modalCtrl: ModalController,
    private callNumber: CallNumber,
    public actionSheetController: ActionSheetController
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
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

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "flex";
    }
  }

  ionViewDidLoad() {
    console.log("Accept-Detail Page");
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
      this.service.HomeConfig().then((results) => this.handleConfig(results));
    }
    this.CompletDetail = "";
    this.CompletDetail = this.navParams.get("Complat");
    this.Acceptdata = this.navParams.get("accepdtl");
    this.jobId = this.Acceptdata.jobid;
    this.JobNo = this.Acceptdata.id;
    this.QuoteId = this.Acceptdata.id;
    console.log("selected jobId", this.jobId);
    console.log("selected JobNo", this.JobNo);
    console.log("selected service", this.Acceptdata);
    this.ServiceType = this.Acceptdata.type;
    this.isFlashDeal = this.Acceptdata.isFlashDeal;

    if (this.ServiceType == "2") {
      this.workType = 2;
      console.log("this is quote type service");
      this.QuoteDetal();
      this.JobDetail();
      this.Jobdata();
    } else {
      this.workType = 1;
      console.log("this is normal type service");
      this.JobDetail();
      this.Jobdata();
    }
  }

  handleConfig(results) {
    console.log("config", results);
    if (results.data) {
      this.tax = results.data[9].value / 100;
    }
  }

  Jobdata() {
    this.jobId = this.Acceptdata.jobid;
    this.JobNo = this.Acceptdata.id;
    this.ServiceName = this.Acceptdata.servicename;
    this.ServiceIcon = this.config.imgs + this.Acceptdata.icon;
    this.mainCatName = this.Acceptdata.mainServicename;
    this.mainCatIcon = this.config.imgs + this.Acceptdata.mainCatIcon;

    this.Address = this.Acceptdata.address;
    this.providerId = this.Acceptdata.provider_id;

    this.providerName = this.Acceptdata.providername;
    this.providerImage = this.Acceptdata.provider_image;

    this.assignedTecId = this.Acceptdata.assigned_tec_id;
    this.assignedTec = this.Acceptdata.assigned_to;
    this.assignedTecImage = this.Acceptdata.assigned_tec_image;

    this.UserNamedefult = this.Acceptdata.username;
    this.JobDate = this.Acceptdata.date;
    this.PaymentStatus = this.Acceptdata.payment_status;
    this.PaymentType = this.Acceptdata.payment_type;
    this.IsReview = this.Acceptdata.is_rewied;

    this.discountedPrice = this.Acceptdata.price;
    this.discountPercentage = this.Acceptdata.discount_percentage;
    this.accepted_date = this.Acceptdata.accepted_date;
    this.accepted_date1 = this.Acceptdata.accepted_date1;

    /*  var servty = this.Acceptdata.type;
    if (servty == "2") {
      this.HorlyQuote = "2";
    } else {
      this.HorlyQuote = "1";
    } */
    if (this.workType == 1) {
      this.priceDescription = this.Acceptdata.type;
    }

    this.setDate(this.Acceptdata.date);

    this.ServicePrice = this.Acceptdata.price;
    this.AditionPrice = this.Acceptdata.additional_hourly_rate;
    this.lat = this.Acceptdata.lati;
    this.lang = this.Acceptdata.longi;

    var Tme = this.Acceptdata.time;

    this.Description = this.Acceptdata.description;
    this.WorkStatus = JSON.parse(this.Acceptdata.status);
    var nativepath = this.Acceptdata.attechment;
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
    console.log(this.newAttechmeny);
    if (this.WorkStatus == 3) {
      this.reciptDetail();
    }
  }
  setDate(data) {
    var dt = data;
    this.Datee = dt.split(",");
    console.log(this.Datee);
  }

  setTime(time) {
    this.TimesSplit = time.split(",");
    this.JobTime = this.Acceptdata.time;
    var hou = time.slice(0, 2);
    var mnt = time.slice(3, 5);
    var hours = hou > 12 ? hou - 12 : hou;
    var am_pm = hou >= 12 ? "PM" : "AM";
    this.Timee = hours + ":" + mnt + " " + am_pm;
  }

  JobDetail() {
    this.alert.showLoader("");
    var params = {
      id: this.JobNo,
    };
    console.log(params);
    this.service.JobDetail(params).then((results) => {
      console.log("job-detail", results);
      this.HendalJobDetail(results);
    });
  }
  reciptDetail() {
    var params = {
      job_id: this.JobNo,
    };
    this.service.getMedia(params).then((result: any) => {
      console.log("work media", result);
      if (result.data && result.ResponseCode === "1") {
        result.data.forEach((element) => {
          if (element.completedmedia) {
            this.completedMedia.push(element.completedmedia);
          }
          if (element.premedia) {
            this.preMedia.push(element.premedia);
          }
        });
      }
    });

    this.service.getRecipt(params).then((results: any) => {
      if (results.receipt_data) {
        this.recipt = results.receipt_data;
        console.log("recipt", results);
        this.labourTotal = parseInt(this.recipt.labourCost);

        if (!(this.recipt.additionalrate == "")) {
          this.additionRateTotal = JSON.parse(this.recipt.additionalrate);
        } else {
          this.additionRateTotal = 0;
        }
        console.log(this.additionRateTotal);
        console.log(this.labourTotal);

        this.finalJobNote = this.recipt.job_note;
        this.additionCostNote = this.recipt.additioncosttext;
        this.subTotal = parseInt(this.recipt.sub_total);
        this.taxValue = this.subTotal * this.tax;
        this.grandTotal = this.subTotal + this.taxValue;
      }
    });
  }

  HendalJobDetail(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.setDate(results.data.date);
      this.setTime(results.data.time);

      this.CompleteJb = results.data.complete_job;
      var ratin = results.data.rate;
      this.myRating = Math.round(ratin);
      this.additionalRateDescription =
        results.data.additional_hourly_rate_description;
      this.priceDescription = results.data.pricepriceDescription;
      this.additionalRatePrice = results.data.additional_hourly_rate;
      this.ServicePrice = results.data.price;
      this.PaymentStatus = results.data.payment_status;
      this.providerMobile = results.data.mobile;
      this.estimateArrival = results.data.estimateArrival;

      if (this.myRating == 0) {
        this.myRating = 5;
      }
      this.WorkStatus == JSON.parse(results.data.status);

      this.requestedTimeStamp = this.formatTimeStamp(
        results.data.requestedTimeStamp
      );
      this.acceptedTimeStamp = this.formatTimeStamp(
        results.data.accepetdTimeStamp
      );
      this.progressTimeStamp = this.formatTimeStamp(
        results.data.progessTimeStamp
      );
      this.enRouteTimeStamp = this.formatTimeStamp(
        results.data.enRouteTimeStamp
      );
      this.completedTimeStamp = this.formatTimeStamp(
        results.data.completedTimeStamp
      );

      console.log("requested time stamp", this.requestedTimeStamp);
      console.log("accepted time stamp", this.acceptedTimeStamp);
      console.log("enroute time stamp", this.enRouteTimeStamp);
      console.log("progress time stamp", this.progressTimeStamp);
      console.log("complete time stamp", this.completedTimeStamp);

      console.log("workstatus", this.WorkStatus);
      if (results.data.discount_percentage) {
        this.discount_percentage = JSON.parse(results.data.discount_percentage);
      }
    }
  }

  getLocation() {
    this.Geolocation.getCurrentPosition()
      .then((res) => {
        let location =
          "lat " + res.coords.latitude + " lang " + res.coords.longitude;
        console.log(location);
        this.lat = res.coords.latitude;
        this.lang = res.coords.longitude;
        this.loadMap();
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  loadMap() {
    console.log(this.lat);
    console.log(this.lang);
    let latLng = new google.maps.LatLng(this.lat, this.lang);
    console.log(latLng);
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarkersToMap();
  }

  addMarkersToMap() {
    var position = new google.maps.LatLng(this.lat, this.lang);
    var dogwalkMarker = new google.maps.Marker({
      map: this.map,
      position: position,
      fullScreenControl: false,
      zoomControl: false,
      icon: {
        url: "assets/imgs/pinflash.png",
        scaledSize: new google.maps.Size(28, 28),
      },
    });
    dogwalkMarker.setMap(this.map);
  }

  CancelJob() {
    let CancelModal = this.modalCtrl.create(CancelPage, { JobNo: this.JobNo });
    CancelModal.onDidDismiss((data) => {
      console.log(data);
      if (data && data == "Success") {
        this.navCtrl.pop();
      }
    });
    CancelModal.present();
  }

  ReschedulJob() {
    var jobData = {
      Jobtype: "Res",
      JobNo: this.JobNo,
      Jobdate: this.JobDate,
      Jobtime: this.JobTime,
      providerId: this.providerId,
      providerName: this.providerName,
    };
    let rescheduleModal = this.modalCtrl.create(CalanderPage, {
      jobData: jobData,
      type: 1,
    });
    rescheduleModal.onDidDismiss((data) => {
      console.log("after reshedule", data);
      if (data !== false) {
        this.MessageClient(data, 1, this.providerId, this.providerName, 1);
      }
    });
    rescheduleModal.present(); /*  else {
      this.alert.showLoader("");
      var params = {
        id: this.JobNo,
        payment_type: ty,
        payment_status: pasts,
      };
      console.log(params);
      this.service
        .PayPayment(params)
        .then((results) => this.HandlePaymet(results));
    } */

    /*   if (ty == "3") {
      var jobData = {
        Jobtype: "Pay",
        JobNo: this.JobNo,
        Jobdate: this.JobDate,
        Jobtime: this.JobTime,
      };
      let rescheduleModal = this.modalCtrl.create(ReschedulePage, {
        jobData: jobData,
      });
      rescheduleModal.onDidDismiss((data) => {
        console.log(data);
        if (data && data == "Success") {
          this.SuccessModel();
        }
      });
      rescheduleModal.present();
    } */
  }
  payment(type, pasts) {
    this.alert.showLoader("");

    var params = {
      id: this.JobNo,
      Jobtype: "Pay",
      payment_type: type,
      payment_status: pasts,
    };
    console.log(params);
    this.service
      .PayPayment(params)
      .then((results) => this.HandlePaymet(results));
  }

  HandlePaymet(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.SuccessModel();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  SuccessModel() {
    let rescheduleModal = this.modalCtrl.create(SuccessPage);
    rescheduleModal.onDidDismiss((data) => {
      console.log(data);
      this.navCtrl.pop();
    });
    rescheduleModal.present();
  }

  MessageClient(data, type, messagerId, messagerName, convoType) {
    let chatModal = this.modalCtrl.create(ChatPage, {
      id: messagerId,
      name: messagerName,
      type: type,
      message: data,
      convoType: convoType,
      isTecAssigned: this.Acceptdata.is_assigned,
    });

    chatModal.onDidDismiss((data) => {
      console.log("after messgaing client", data);
      if (data == true) {
        this.JobDetail();
        this.alert.showAlert("sucess", "message sent to client sucessfully");
      }
    });
    chatModal.present();
  }

  MyWay() {
    this.WorkStatus = "1";
  }

  InProgress() {
    this.WorkStatus = "2";
  }

  BackTo() {
    this.navCtrl.pop();
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  Review(type) {
    let ReviewModal = this.modalCtrl.create(ReviewPage, {
      jobData: this.Acceptdata,
      Type: type,
    });
    ReviewModal.onDidDismiss((data) => {
      console.log(data);
      if (data) {
        this.navCtrl.pop();
      }
    });
    ReviewModal.present();
  }

  dateSet(dt) {
    var nd = new Date(dt + "T00:00:00");

    var th = String(nd);
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var years = th.slice(11, 15);
    return day + ", " + month + " " + dates + ", " + years;
  }

  CreateDispute() {
    let alert = this.alertCtrl.create({
      title: "Create Dispute",
      subTitle: "Reason Create Dispute:",
      inputs: [
        {
          placeholder: "Let us know the reason(s) for Dispute this job",
        },
      ],
      buttons: [
        {
          text: "CANCEL",
          role: "cancel",
          handler: (data) => {
            console.log(data);
            console.log("Cancel clicked");
          },
        },
        {
          text: "SUBMIT",
          handler: (data) => {
            console.log(data);
            this.alert.showLoader("");
            var params = {
              user_id: this.UserId,
              job_id: this.JobNo,
              reason: data,
            };
            console.log(params);
            this.service
              .DisputeJob(params)
              .then((results) => this.HandleDispute(results));
          },
        },
      ],
    });
    alert.present();
  }

  HandleDispute(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.navCtrl.pop();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  PhoneCall() {
    this.callNumber
      .callNumber(this.providerMobile, true)
      .then((res) => console.log("Launched dialer!", res))
      .catch((err) => console.log("Error launching dialer", err));
  }

  //for quotes
  QuoteDetal() {
    /* this.alert.showLoader("oading"); */
    var params = {
      job_id: this.QuoteId,
    };

    this.service.ViewQuote(params).then((results) => this.HandleQuote(results));
  }
  viewQuotes() {
    console.log("qoute detail", this.Acceptdata);
    this.navCtrl.push(QuoteDetailPage, {
      QuoteData: this.Acceptdata,
      isPackage: false,
    });
  }

  HandleQuote(results) {
    console.log("resuts", results);
    /* this.alert.dissmissLoader(); */

    if (results.ResponseCode == 1) {
      var QuteDtaLit = results.data;
      if (results.data) {
        if (QuteDtaLit[0].jstatus != 0) {
          this.qstatus = Number(QuteDtaLit[0].jstatus) + Number(1);
        } else {
          this.qstatus = QuteDtaLit[0].status;
        }

        if (QuteDtaLit[0].status == "1") {
          this.QuoteDataList.push(QuteDtaLit[0]);
        } else {
          this.QuoteDataList = QuteDtaLit;
        }
        console.log("quote list here", this.QuoteDataList);
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  AcceptQuote(id) {
    this.alert.showLoader("");
    var params = {
      id: id,
    };
    console.log(params);
    this.service
      .QuoteAccept(params)
      .then((results) => this.HandleAcceptQ(results));
  }

  HandleAcceptQ(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.alert.showAlert("Success", results.ResponseMsg);
      this.navCtrl.pop();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  getProviderReviews() {
    var params = {
      job_id: this.QuoteId,
    };

    this.service.requestReview(params).then((results) => console.log(results));
  }

  /* requestNewJob() {


  } */

  useCredit(type, past) {
    let ReviewModal = this.modalCtrl.create(ApplyCreditPointsPage, {
      jobData: this.Acceptdata,
      Type: type,
    });
    ReviewModal.onDidDismiss((data, creditType) => {
      if (creditType == "credit") {
        this.creditUsed = data;
        console.log(data);
        this.subTotal = this.subTotal - this.creditUsed;
      }
      if (creditType == "point") {
        this.pointsUsed = data;
        console.log(data);
        this.subTotal = this.subTotal - this.pointsUsed;
      }

      this.payment(type, past);
    });
    ReviewModal.present();
  }

  async requestNewJob() {
    var data = "Can you book a follow up for me?";
    const actionSheet = await this.actionSheetController.create({
      title: "An automated message will ask ",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "send",

          icon: "send",
          handler: () => {
            this.MessageClient(data, 2, this.providerId, this.providerName, 1);
          },
        },
        {
          text: "close",
          icon: "close",
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
  Attechfile() {}

  formatTimeStamp(dateTime) {
    if (dateTime) {
      var timeStamp = dateTime.split(",");
      return timeStamp;
    } else {
      return null;
    }
  }
}

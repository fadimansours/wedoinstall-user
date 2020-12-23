import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ConfigProvider } from "../../providers/config/config";
import { ServiceProvider } from "../../providers/service/service";
import { AcceptDetailPage } from "../accept-detail/accept-detail";
import { AddressDetailPage } from "../address-detail/address-detail";
import { ConfirmJobdetailPage } from "../confirm-jobdetail/confirm-jobdetail";
import { RequestJobPage } from "../request-job/request-job";
import * as moment from "moment";
import { notificationService } from "../../providers/service/notification";

@IonicPage()
@Component({
  selector: "page-quote-detail",
  templateUrl: "quote-detail.html",
})
export class QuoteDetailPage {
  QuoteId: any;
  QuoteDataList: any;
  tabBarElement: any;
  qstatus: any;
  quoteIndex: any;
  QuoteData: any;
  quoteList: any;
  quoteJobTitle: any;
  providerRatings: any = [];
  providerComplteedJobs: any = [];
  isPackage: boolean;
  packageData: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider,
    public modalCtrl: ModalController,
    private notificationService: notificationService
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
    this.QuoteDataList = [];
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
    console.log("Quote-Detail Page");

    this.isPackage = this.navParams.get("isPackage");
    if (!this.isPackage) {
      this.QuoteData = this.navParams.get("QuoteData");
      this.QuoteId = this.QuoteData.id;
      this.quoteJobTitle = this.QuoteData.servicename;

      this.QuoteDetal();
      console.log("quoteData", this.QuoteData);
      console.log("quoteData", this.quoteJobTitle);
    } else if (this.isPackage) {
      this.packageData = this.navParams.get("QuoteData");
      console.log("package detail", this.packageData);

      this.getPackageProviderDetail();
    }
  }

  QuoteDetal() {
    this.alert.showLoader("");
    var params = {
      job_id: this.QuoteId,
    };
    console.log(params);
    this.service.ViewQuote(params).then((results) => this.HandleQuote(results));
  }

  HandleQuote(results) {
    console.log("resuts", results);
    this.quoteList = results.data;
    this.getProviderDetail();
    this.alert.dissmissLoader();

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
        console.log("quote list", this.QuoteDataList);
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
      this.notificationService.updateJobStatus(
        this.QuoteId,
        "0",
        this.getTimeStamp()
      );

      this.navCtrl.pop();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  getProviderDetail() {
    if (this.quoteList) {
      this.quoteList.forEach((element) => {
        let provider_id = element.provider_id;
        var params = {
          provider_id: provider_id,
        };
        console.log(params);
        this.service.getReview(params).then((results: any) => {
          console.log(
            "review for" + "" + provider_id + "" + "are",
            results.review
          );
          let reviews = results.review;
          let lenght = results.review.length;
          let totalRate = 0;
          reviews.forEach((x) => {
            console.log(x.rate);
            totalRate = totalRate + JSON.parse(x.rate);
          });
          let finalRating = totalRate / lenght;

          this.providerRatings.push(Math.round(finalRating));
          console.log("privider rating list", this.providerRatings);
        });

        this.service.getProviderJobs(params).then((results: any) => {
          console.log("provider jobs", results);
          this.providerComplteedJobs.push(results.data[0].total_job);
          console.log("privider jobscount list", this.providerComplteedJobs);
        });
      });
    }
  }

  getPackageProviderDetail() {
    var params = {
      provider_id: this.packageData.provider_id,
    };

    this.service.getReview(params).then((results: any) => {
      console.log("provider details", results);
      let reviews = results.review;
      let lenght = results.review.length;
      let totalRate = 0;
      reviews.forEach((x) => {
        console.log(x.rate);
        totalRate = totalRate + JSON.parse(x.rate);
      });
      let finalRating = totalRate / lenght;

      this.providerRatings.push(Math.round(finalRating));
      console.log("privider rating list", this.providerRatings);
    });

    this.service.getProviderJobs(params).then((results: any) => {
      console.log("provider jobs", results);
      this.providerComplteedJobs.push(results.data[0].total_job);
      console.log("privider jobscount list", this.providerComplteedJobs);
    });
  }
  getTimeStamp() {
    var time = moment();
    var time2 = moment().calendar();
    var time_format = time.format("MMM Do, h:mm a");
    console.log(time_format);
    console.log(time2);
    return time_format;
  }

  dateset(dt) {
    var nedt = dt.split(",");
    var ndt = nedt[0];
    var nd = new Date(ndt);
    var th = String(nd);
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var years = th.slice(11, 15);
    return (
      day + ", " + month + " " + dates + ", " + years + "  ( " + nedt[1] + " )"
    );
  }

  showDetail() {
    this.navCtrl.push(AcceptDetailPage, { accepdtl: this.QuoteData });
  }

  acceptPackage() {
    var params = {
      provider_id: this.packageData.provider_id,
      user_id: this.config.loginId,
      userName: this.config.FirstName,
      service: null,
      mainCatId: null,
      end_date: this.packageData.date,
      time: this.packageData.time,
      price: this.packageData.amount,
      description: this.packageData.description,
      serviceName: this.packageData.packageName,
      isFlashDeal: false,
      isStreak: false,
      pointsUsed: false,
      creditUsed: false,
      picture: this.packageData.attachment1,
    };

    this.navCtrl.push(RequestJobPage, {
      CatData: params,
      isPackage: true,
      type: 3,
      flash: null,
      streak: null,
      packageData: this.packageData,
    });
    console.log("quote job data", params);
  }

  presentImage() {}
}

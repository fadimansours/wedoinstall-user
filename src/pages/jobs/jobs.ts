import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { SigninModalPage } from "../signin-modal/signin-modal";
import { TabsPage } from "../tabs/tabs";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ConversationPage } from "../conversation/conversation";
import { AcceptDetailPage } from "../accept-detail/accept-detail";
import { ConfigProvider } from "../../providers/config/config";
import { QuoteDetailPage } from "../quote-detail/quote-detail";
import { AdminChatPage } from "../admin-chat/admin-chat";

@IonicPage()
@Component({
  selector: "page-jobs",
  templateUrl: "jobs.html",
})
export class JobsPage {
  UserData: any;
  UserId: any;
  ActivJob: any = [];
  ActiveLength: any;
  CompletJob: any;
  cancelledJob: any = [];
  cancelledQuote: any = [];
  CompletLength: any;
  QuoteJob: any = [];
  ActivShow: boolean;
  ComplatShow: boolean;
  QuoteShow: boolean;
  QuoteLength: any;
  searchName_Actv: string;
  searchName_comp: string;
  searchName_quote: string;
  temp_ActivJob;
  temp_CompletJob: any;
  temp_QuoteJob: any;
  searchName;
  temp_cancelledJob: any;
  cancelledShow: boolean;
  cancelledQuoteShow: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    private config: ConfigProvider
  ) {}

  // ionViewWillEnter() {
  //   let modal = this.modalCtrl.create(SigninModalPage, { "tepshow": '2' });
  //   modal.onDidDismiss(data => {
  //     console.log(data)
  //     this.navCtrl.setRoot(TabsPage)
  //   });
  //   modal.present();
  // }

  ionViewWillEnter() {
    if (this.config.loginId) {
      this.ActivShow = false;
      this.ComplatShow = false;
      this.QuoteShow = false;
      if (localStorage.getItem("Trades_globe")) {
        this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
        this.UserId = this.UserData.id;
      }
      this.GetJob();
    } else {
      let modal = this.modalCtrl.create(SigninModalPage, { tepshow: "2" });
      modal.onDidDismiss((data) => {
        console.log(data);
        this.navCtrl.setRoot(TabsPage);
      });
      modal.present();
    }
  }

  ionViewDidLoad() {
    console.log("Jobs Page");
  }

  GetJob() {
    this.alert.showLoader("");
    var params = {
      user_id: this.UserId,
      type: 1,
    };
    console.log(params);
    this.service.JobsGet(params).then((results) => this.HandleJobs(results));
  }

  HandleJobs(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      /*  results.active.forEach((element) => {
        if (element.status !== "4") {
          this.ActivJob.push(element);
        }
      }); */
      if (results.active) {
        this.ActivJob = results.active.filter(
          (element) => element.status !== "4"
        );
      }

      if (results.active) {
        this.cancelledJob = results.active.filter(
          (element) => element.status == "4"
        );
      }

      /*   this.ActivJob = results.active; */
      if (results.quoted) {
        this.QuoteJob = results.quoted.filter(
          (element) => element.status !== "4"
        );
      }

      if (results.quoted) {
        this.cancelledQuote = results.quoted.filter(
          (element) => element.status == "4"
        );
      }

      this.CompletJob = results.completed;
      this.temp_CompletJob = this.CompletJob;
      this.temp_ActivJob = this.ActivJob;

      this.temp_QuoteJob = this.QuoteJob;
      this.temp_cancelledJob = this.cancelledJob;
      if (this.ActivJob) {
        this.ActiveLength = this.ActivJob.length;
      } else {
        this.ActiveLength = 0;
      }
      if (this.CompletJob) {
        this.CompletLength = results.completed.length;
      } else {
        this.CompletLength = 0;
      }
      if (this.QuoteJob) {
        this.QuoteLength = this.QuoteJob.length;
      } else {
        this.QuoteLength = 0;
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
    console.log("active jobs", this.ActivJob);
    console.log("cancelled jobs", this.cancelledJob);
    console.log("quote jobs", this.QuoteJob);
    console.log("cancelled quote jobs", this.cancelledQuote);
    console.log("complete jobs", this.CompletJob);
  }

  DateSplit(dt) {
    var res = dt.split(",");
    var nd = new Date(res[0] + "T00:00:00");

    var th = String(nd);
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var years = th.slice(11, 15);
    return day + ", " + month + " " + dates + ", " + years;
  }

  DateSplitCon(dt) {
    var res = dt.slice(8, 10);
    return res;
  }

  TimeSplit(tm) {
    var res = tm.split(",");
    return res[0];
  }

  MonthSet(dt) {
    var month = dt.slice(5, 7);
    var yearr = dt.slice(0, 4);

    if (month == "01") {
      return "JANUARY" + ", " + yearr;
    } else if (month == "02") {
      return "FEBRUARY" + ", " + yearr;
    } else if (month == "03") {
      return "MARCH" + ", " + yearr;
    } else if (month == "04") {
      return "APRIL" + ", " + yearr;
    } else if (month == "05") {
      return "MAY" + ", " + yearr;
    } else if (month == "06") {
      return "JUNE" + ", " + yearr;
    } else if (month == "07") {
      return "JULY" + ", " + yearr;
    } else if (month == "08") {
      return "AUGUST" + ", " + yearr;
    } else if (month == "09") {
      return "SEPTEMBER" + ", " + yearr;
    } else if (month == "10") {
      return "OCTOBER" + ", " + yearr;
    } else if (month == "11") {
      return "NOVEMBER" + ", " + yearr;
    } else if (month == "12") {
      return "DECEMBER" + ", " + yearr;
    }
  }

  DayNameGet(dtdy) {
    var res = dtdy.split(",");
    var d = new Date(res[0] + "T00:00:00");
    var days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    var dys = days[d.getDay()];
    return dys;
  }

  FormatTime(dateString) {
    var hou = dateString.slice(0, 2);
    var mnt = dateString.slice(3, 5);
    var hours = hou > 12 ? hou - 12 : hou;
    var am_pm = hou >= 12 ? "PM" : "AM";
    return hours + ":" + mnt + " " + am_pm;
  }

  Chat() {
    this.navCtrl.push(ConversationPage);
  }

  ActiveOpen(id) {
    if (id == 1) {
      this.ActivShow = true;
    } else {
      this.ActivShow = false;
    }
  }

  ComplatOpen(id) {
    if (id == 1) {
      this.ComplatShow = true;
    } else {
      this.ComplatShow = false;
    }
  }

  cancelledOpen(id) {
    if (id == 1) {
      this.cancelledShow = true;
    } else {
      this.cancelledShow = false;
    }
  }

  cancelledQuoteOpen(id) {
    if (id == 1) {
      this.cancelledQuoteShow = true;
    } else {
      this.cancelledQuoteShow = false;
    }
  }

  QuoteOpen(id) {
    if (id == 1) {
      this.QuoteShow = true;
    } else {
      this.QuoteShow = false;
    }
  }

  DetailAccep(d) {
    var accep = this.ActivJob[d];
    this.navCtrl.push(AcceptDetailPage, { accepdtl: accep });
  }

  DetailComplat(d) {
    var accep = this.CompletJob[d];
    this.navCtrl.push(AcceptDetailPage, {
      accepdtl: accep,
      Complat: "complat",
    });
  }
  search() {
    this.reset();
    this.ActivShow = true;
    this.ComplatShow = true;
    this.QuoteShow = true;

    if (!(this.searchName === "")) {
      const searchResult = this.ActivJob.filter((currentList) => {
        if (currentList.servicename && this.searchName) {
          return (
            currentList.servicename
              .toLowerCase()
              .indexOf(this.searchName.toLowerCase()) > -1
          );
        }
      });

      const searchResult2 = this.CompletJob.filter((currentList) => {
        if (currentList.servicename && this.searchName) {
          return (
            currentList.servicename
              .toLowerCase()
              .indexOf(this.searchName.toLowerCase()) > -1
          );
        }
      });
      const searchResult3 = this.QuoteJob.filter((currentList) => {
        if (currentList.servicename && this.searchName) {
          return (
            currentList.servicename
              .toLowerCase()
              .indexOf(this.searchName.toLowerCase()) > -1
          );
        }
      });

      this.ActivJob = searchResult;
      this.CompletJob = searchResult2;
      this.QuoteJob = searchResult3;
    }
  }
  reset() {
    this.CompletJob = this.temp_CompletJob;
    this.ActivJob = this.temp_ActivJob;
    this.QuoteJob = this.temp_QuoteJob;
  }

  search_ActivJob() {
    this.resetChanges_ActivJob();
    if (!(this.searchName_Actv === "")) {
      const searchResult = this.ActivJob.filter((currentList) => {
        if (currentList.servicename && this.searchName_Actv) {
          return (
            currentList.servicename
              .toLowerCase()
              .indexOf(this.searchName_Actv.toLowerCase()) > -1
          );
        }
      });
      this.ActivJob = searchResult;
    }
  }
  resetChanges_ActivJob() {
    this.ActivJob = this.temp_ActivJob;
  }
  search_CompJob() {
    this.resetChanges_CompJob();
    if (!(this.searchName_comp === "")) {
      const searchResult = this.CompletJob.filter((currentList) => {
        if (currentList.servicename && this.searchName_comp) {
          return (
            currentList.servicename
              .toLowerCase()
              .indexOf(this.searchName_comp.toLowerCase()) > -1
          );
        }
      });
      this.CompletJob = searchResult;
    }
  }
  resetChanges_CompJob() {
    this.CompletJob = this.temp_CompletJob;
  }

  QuoteDetail(id: any) {
    var ddf = this.QuoteJob[id];
    console.log("works", ddf);
    this.navCtrl.push(AcceptDetailPage, { accepdtl: ddf });
    // if (ddf.provider_id == '0') {
    //   this.navCtrl.push(QuoteDetailPage, { "qtid": ddf })
    // } else {
    // }
  }

  ShowCoted(id) {
    var ddf = this.QuoteJob[id];
    console.log("qoute detail", ddf);
    this.navCtrl.push(QuoteDetailPage, { QuoteData: ddf, index: id });
  }
  qetail(id) {
    var ddf = this.QuoteJob[id];
    console.log(ddf);
    this.navCtrl.push(AcceptDetailPage, { quote: ddf });
  }

  AdminChat() {
    this.navCtrl.push(AdminChatPage);
  }
}

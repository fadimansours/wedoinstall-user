import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ChatPage } from "../chat/chat";

@IonicPage()
@Component({
  selector: "page-calander",
  templateUrl: "calander.html",
})
export class CalanderPage {
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  TimeHor: any;
  tabBarElement: any;
  months: any = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  today = new Date();
  type: any;
  JobType: any;
  JobId: any;
  DateNew: any;
  TimeNew: any;
  ServiceUser: any;
  ServiceUserNm: any;
  ShowTime: string;
  oldDate: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alert: AlertProvider,
    private service: ServiceProvider
  ) {
    this.type = this.navParams.get("type");
    console.log("today", this.today);
    console.log("today month", this.today.getMonth());
    console.log("today year", this.today.getFullYear());
    var d = new Date();
    d.setMinutes(d.getTimezoneOffset());
    this.date = d;

    // if (document.querySelector('.tabbar')) { this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); }
  }
  // ionViewWillEnter() {
  //   if (this.tabBarElement) { this.tabBarElement.style.display = 'none'; }
  // }
  // ionViewWillLeave() {
  //   if (this.tabBarElement) { this.tabBarElement.style.display = 'flex'; }
  // }

  ionViewDidLoad() {
    console.log("type", this.type);
    if (this.type == 1) {
      //resheduling job type
      console.log("Reschedule ");
      var jobData = this.navParams.get("jobData");
      console.log("job data", jobData);
      this.JobType = jobData.Jobtype;
      this.JobId = jobData.JobNo;
      this.DateNew = jobData.Jobdate;
      this.TimeNew = jobData.Jobtime;
      this.TimeHor = this.TimeNew;
      var Datew = jobData.Jobdate;
      this.ServiceUser = jobData.serviceUser;
      this.ServiceUserNm = jobData.ServiceUserNm;
      console.log(this.ServiceUser + " =>" + this.ServiceUserNm);

      var datsplit = Datew.split(",");
      if (datsplit) {
        console.log("date splir", datsplit);
        this.DateNew = datsplit[0];
      }
      var timeew = jobData.Jobtime;
      var timsplit = timeew.split(",");
      if (timsplit) {
        this.TimeNew = timsplit[0];
      }
      console.log("old time ", this.TimeNew);
      console.log("old date ", this.DateNew);
    }

    console.log("Calander Page");
    this.getDaysOfMonth();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date();
    d.setMinutes(d.getTimezoneOffset());

    this.currentMonth = this.months[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === d.getMonth()) {
      this.currentDate = d.getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    ).getDay();
    var prevNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();
    for (
      var i = prevNumOfDays - (firstDayThisMonth - 1);
      i <= prevNumOfDays;
      i++
    ) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    for (var n = 0; n < thisNumOfDays; n++) {
      this.daysInThisMonth.push(n + 1);
    }

    var lastDayThisMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDay();
    var nextNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 2,
      0
    ).getDate();
    for (var m = 0; m < 6 - lastDayThisMonth; m++) {
      this.daysInNextMonth.push(m + 1);
    }
    var totalDays =
      this.daysInLastMonth.length +
      this.daysInThisMonth.length +
      this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var q = 7 - lastDayThisMonth; q < 7 - lastDayThisMonth + 7; q++) {
        this.daysInNextMonth.push(q);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  selectDate(day) {
    console.log(day);
    this.currentDate = day;
    console.log(this.currentDate);
    console.log(this.currentMonth);
    console.log(this.currentYear);
  }

  TimeSelect(tm) {
    this.TimeHor = tm;
  }

  Continue() {
    var mon;
    if (this.currentMonth == "January") {
      mon = "01";
    } else if (this.currentMonth == "February") {
      mon = "02";
    } else if (this.currentMonth == "March") {
      mon = "03";
    } else if (this.currentMonth == "April") {
      mon = "04";
    } else if (this.currentMonth == "May") {
      mon = "05";
    } else if (this.currentMonth == "June") {
      mon = "06";
    } else if (this.currentMonth == "July") {
      mon = "07";
    } else if (this.currentMonth == "August") {
      mon = "08";
    } else if (this.currentMonth == "September") {
      mon = "09";
    } else if (this.currentMonth == "October") {
      mon = "10";
    } else if (this.currentMonth == "November") {
      mon = "11";
    } else if (this.currentMonth == "December") {
      mon = "12";
    }

    var dt = this.currentYear + "/" + mon + "/" + this.currentDate;
    var nd = new Date(dt);

    var th = String(nd);
    console.log("nd and th", nd, th);
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var years = th.slice(11, 15);
    var dey = day + ", " + month + " " + dates + ", " + years;
    var mnth = String(mon);
    var nwdt = this.currentYear + "-" + mnth + "-" + dates;
    var data = { date: dey, time: this.TimeHor, parsdate: nwdt };

    if (this.type == 1) {
      this.ContinueRes(data);
    }
    if (this.type == 0) {
      if (this.TimeHor) {
        this.viewCtrl.dismiss(data);
      } else {
        this.alert.showToast("Select valid Time!");
      }
    }
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  //reshuling code
  sendMessage(info) {
    this.navCtrl.push(ChatPage, {
      id: this.ServiceUser,
      name: this.ServiceUserNm,
      type: 1, //reshedule

      changedInfo: info,
    });
  }

  ContinueRes(data) {
    this.alert.showLoader("");
    var params = {
      id: this.JobId,
      jdate: data.parsdate,
      jtime: this.TimeNew,
    };
    console.log(params);
    this.service.ResedulJob(params).then((results) => {
      this.HandleRechedul(results, params);
    });
  }

  HandleRechedul(results, params) {
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      var data = "Success";
      /*  this.viewCtrl.dismiss(results.ResponseCode)
      ; */
      this.alert.showAlert("Resheduled sucessfully", results.ResponseMsg);
      this.viewCtrl.dismiss(params);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
      this.viewCtrl.dismiss(false);
    }
  }

  SelectTime() {
    console.log("input");
    this.ShowTime = "1";
  }

  selectTimeRes(tm) {
    this.TimeHor = tm;
    this.TimeNew = tm;

    console.log("new time", this.TimeNew);
  }

  selectDateRes(day) {
    this.currentDate = day;
    this.DateNew = day;
    console.log("new date", this.DateNew);
  }
}

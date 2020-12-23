import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigProvider {
  public url: string;
  public imgs: string;
  public LoginData: any;
  public Languagge: any;
  public guestId: any;
  public loginId: any;
  public FirstName: any;
  public LastName: any;
  public Email: any;
  public PhoneNumber: any;
  public UserAddress: any;
  public UserPoint: any;
  public UserBalance: any;

  constructor(public http: HttpClient) {
    this.url = "http://tradesglobeinc.com/api/";
    this.imgs = "http://tradesglobeinc.com/admin/";
    this.LoginData = JSON.parse(localStorage.getItem("Trades_globe"));
  }

  public userlogin() {
    if (localStorage.getItem("Trades_globe")) {
      var lgd = JSON.parse(localStorage.getItem("Trades_globe"));
      console.log("login", lgd);
      this.loginId = lgd.id;
      this.FirstName = lgd.name;
      this.LastName = lgd.last_name;
      this.Email = lgd.email;
      this.PhoneNumber = lgd.mobile;
      this.UserAddress = lgd.primary_address;
      this.UserPoint = lgd.point;
      this.UserBalance = lgd.balance;
    }
  }

  public getUserDetails() {
    return JSON.parse(localStorage.getItem("Trades_globe"));
  }
  public getCreditBalance() {
    return JSON.parse(localStorage.getItem("user_credit"));
  }
}

import { Injectable } from "@angular/core";
import { ConfigProvider } from "../config/config";
import "rxjs/add/operator/map";
import { ServiceProvider } from "./service";
import { AlertProvider } from "../alert/alert";
@Injectable()
export class couponService {
  user: any;
  url: string;
  newurl: string;
  userId: string;
  public userDetail: any;
  public creditBalance: any;

  constructor(
    private config: ConfigProvider,
    public service: ServiceProvider,
    private alert: AlertProvider
  ) {
    this.url = this.config.url;
    this.userId = this.config.loginId;
  }

  public addCoupon(couponCode) {
    this.alert.showLoader("");
    var params = {
      user_id: this.userId,
      code: couponCode,
    };
    console.log(params);
    this.service
      .CouponCode(params)
      .then((results) => this.HandleCoupon(results));
  }

  public HandleCoupon(results) {
    console.log("coupon", results);
    console.log("coupon value", JSON.parse(results.percentage.percentage));
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.creditBalance =
        this.creditBalance + JSON.parse(results.percentage.percentage);
      this.updateCredit(this.creditBalance);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  updateCredit(credit) {
    var params = {
      credit: credit,
      user_id: this.userId,
    };
    this.service.updateCreditBalance(params).then((result: any) => {
      console.log("rsp", result);
      localStorage.setItem("user_credit", JSON.stringify(this.creditBalance));
      this.alert.showAlert("sucessfully updated ", result.ResponseMsg);
    });
  }
  getCreditBalnce() {
    var params = {
      user_id: this.userId,
    };
    console.log(params);
    this.service.getUserDetails(params).then((result: any) => {
      console.log(result.data[0]);
      let bal = JSON.parse(result.data[0].balance);
      this.creditBalance = bal;
      console.log("current balance", bal);
    });
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "../config/config";

import { AlertProvider } from "../alert/alert";
import { ServiceProvider } from "../service/service";

@Injectable()
export class creditServiceProvider {
  user: any;
  url: string;
  newurl: string;
  userId: string;
  public userDetail: any;
  public creditBalance: number;
  pointsBalance: number;

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

    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("coupon value", JSON.parse(results.percentage.percentage));
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
      this.getCreditPointsBalnce();
      localStorage.setItem("user_credit", JSON.stringify(this.creditBalance));
      this.alert.showAlert("sucessfully updated ", result.ResponseMsg);
    });
  }

  updatePoints(points) {
    var params = {
      points: points,
      user_id: this.userId,
    };
    this.service.updatePointsBalance(params).then((result: any) => {
      this.getCreditPointsBalnce();
      localStorage.setItem("user_points", JSON.stringify(this.pointsBalance));
      this.alert.showAlert("sucessfully updated ", result.ResponseMsg);
    });
  }

  getCreditPointsBalnce() {
    var params = {
      user_id: this.userId,
    };
    this.service.getUserDetails(params).then((result: any) => {
      console.log(result.data[0]);
      if (result.data[0].balance) {
        var creditbalance = JSON.parse(result.data[0].balance);
      }
      if (result.data[0].point) {
        var pointsBalance = JSON.parse(result.data[0].point);
      }

      this.creditBalance = creditbalance;
      this.pointsBalance = pointsBalance;
      console.log("current balance", creditbalance);
    });
  }

  public getCredit() {
    return this.creditBalance;
  }
  public getPoints() {
    return this.pointsBalance;
  }
}

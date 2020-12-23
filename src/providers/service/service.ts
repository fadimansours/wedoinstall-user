import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "../config/config";
import "rxjs/add/operator/map";

@Injectable()
export class ServiceProvider {
  user: any;
  url: string;
  newurl: string;
  userId: string;

  constructor(public http: HttpClient, private config: ConfigProvider) {
    this.url = this.config.url;
    this.userId = this.config.loginId;
    console.log("This ServiceProvider Here");
  }

  Signup(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "signup.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  Logins(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "login.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  public sendNotification(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "sendnotification.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  updateJobStatus(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updateJobStatus.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  EditProfil(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updateprofile.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  CardAdd(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "addcard.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  CardGet(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getcard.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  CategoryGet() {
    return new Promise((resolve) => {
      this.http
        .get(this.url + "getcategory.php")
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  GetPopularJob() {
    return new Promise((resolve) => {
      this.http
        .get(this.url + "popularservice.php")
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  getTax() {
    return new Promise((resolve) => {
      this.http
        .get(this.url + "getconfig.php")
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  GetSeasonal() {
    return new Promise((resolve) => {
      this.http
        .get(this.url + "seasonalcategory.php")
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  GetStreak(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getstreak.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  getPackages(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getCustomPackage.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  SubCategory(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getsubcategory.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  RequestJob(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "requestjob.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  requestProduct(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "requestProduct.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  JobsGet(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "myjob.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  CouponCode(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "applycouponcode.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  FlashDeals(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "flash_deals.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  CancelJob(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "cancel_job.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  ResedulJob(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "reschedulejob.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  PayPayment(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "paypayment.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  StripePay(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "stripe/stripe_payment.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  AddReviw(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "addreview.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  EditReviw(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "editreview.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  getProviderPreviousReview(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getPreviousReview.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  requestReview(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "requestreview.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  getReview(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getreview.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  getProviderJobs(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getProviderJob.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  getUserDetails(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getUserDetail.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  DisputeJob(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "createdispute.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  ViewQuote(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "view_quote.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  QuoteAccept(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "accept_quote.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  AddressAdd(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "addaddress.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  AddressGet(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "myaddress.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  AddressUpdate(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updateaddress.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  RendomPointGet(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "redeempoint.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  LiveLocation(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updatelocation.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  UserPoint(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "userstatic.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  GetProduct(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getproduct.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  AddtCart(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "addtocart.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  GetCart(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getcart.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  RemoveCart(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "removecart.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  updateCustomePackage(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updateCustomePackage.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  UpdateCart(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updatecart.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  BookProduc(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "bookproduct.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  ProductStripe(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "stripe/stripe_payment_product.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  getMedia(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "getMedia.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }
  addOrder(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "addOrder.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  GetOrder(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "myorder.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;
          resolve(this.user);
        });
    });
  }

  OrderDetail(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "orderdetail.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }

  HomeConfig() {
    return new Promise((resolve) => {
      this.http
        .get(this.url + "getconfig.php")
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }

  JobDetail(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "jobdetail.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }

  getRecipt(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "view_receipt.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }

  updateCreditBalance(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updateCreditBalance.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }
  updatePointsBalance(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "updatePointsBalance.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }

  public getCreditBalance() {
    var params = {
      user_id: this.userId,
    };
    this.getUserDetails(params).then((result: any) => {
      let bal = JSON.parse(result.data[0].balance);
      return bal;
    });
  }

  getTechnicianDetail(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "get_Technician_Detail.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }
  getProviderDetail(params) {
    return new Promise((resolve) => {
      this.http
        .post(this.url + "get_Provider_Detail.php", params)
        .map((res) => res)
        .subscribe((data) => {
          this.user = data;

          resolve(this.user);
        });
    });
  }
}

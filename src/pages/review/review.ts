import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ViewController } from "ionic-angular/navigation/view-controller";

@IonicPage()
@Component({
  selector: "page-review",
  templateUrl: "review.html",
})
export class ReviewPage {
  providerId: any;
  jobId: any;
  myRating: number;
  reviewText: any;
  UserId: any;
  Acceptdata: any;
  Type: any;
  ServiceUserNm: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log("Review Page");
    if (localStorage.getItem("Trades_globe")) {
      var UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = UserData.id;
    }
    this.Type = this.navParams.get("Type");
    this.Acceptdata = this.navParams.get("jobData");
    console.log("job data", this.Acceptdata);
    this.providerId = this.Acceptdata.provider_id;
    this.jobId = this.Acceptdata.id;
    this.ServiceUserNm = this.Acceptdata.providername;

    if (this.Type == 1) {
      console.log("editing review");
      var params = {
        provider_id: this.providerId,
        user_id: this.UserId,
        jod_id: this.jobId,
      };
      console.log(params);

      this.service.getProviderPreviousReview(params).then((result: any) => {
        console.log("previos review", result);
        this.myRating = result.data[0].rate;
        this.reviewText = result.data[0].comment;
      });
    } else {
      console.log("adding new review");

      this.myRating = 0;
      this.reviewText = "";
    }
  }

  rating(data) {
    this.myRating = data;
  }

  Continue() {
    if (this.validate()) {
      this.alert.showLoader("");
      var params = {
        provider_id: this.providerId,
        user_id: this.UserId,
        comments: this.reviewText,
        rate: this.myRating,
        job_id: this.jobId,
        user_name: this.Acceptdata.username,
        provider_name: this.Acceptdata.providername,
        technician_name: this.Acceptdata.assigned_to,
      };
      console.log(params);

      if (this.Type == 0) {
        this.service
          .AddReviw(params)
          .then((results) => this.HandleReview(results));
      } else if (this.Type == 1) {
        this.service
          .EditReviw(params)
          .then((results) => this.HandleReview(results));
      }
    }
  }

  HandleReview(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.alert.showAlert("Success", results.ResponseMsg);
      var data = "Success";
      this.viewCtrl.dismiss(data);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  validate() {
    if (!this.reviewText) {
      this.alert.showAlert("Attention", "Please enter valid Comments!");
      return false;
    } else if (this.myRating < 1) {
      this.alert.showAlert("Attention", "Please enter valid Rate!");
      return false;
    }
    return true;
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }
}

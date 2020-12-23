import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular/navigation/view-controller";

@IonicPage()
@Component({
  selector: "page-request-model",
  templateUrl: "request-model.html",
})
export class RequestModelPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log("Request-Model Page");
  }

  CloseTop() {
    var data = "Done";
    this.viewCtrl.dismiss(data);
  }

  CloseBottom() {
    var data = "Done";
    this.viewCtrl.dismiss(data);
  }
}

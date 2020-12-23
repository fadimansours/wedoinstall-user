import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConfigProvider } from "../../providers/config/config";
import { RequestJobPage } from "../request-job/request-job";

/**
 * Generated class for the SubSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sub-search",
  templateUrl: "sub-search.html",
})
export class SubSearchPage {
  subCatergories: any;
  catergoryData: any;
  searchName: string;
  temp_subcatergories: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SubSearchPage");
    this.subCatergories = this.navParams.get("data");
    this.temp_subcatergories = this.subCatergories;
    this.catergoryData = this.navParams.get("mainData");
  }

  onClickSub(item) {
    console.log("selected item", item);
    this.navCtrl.push(RequestJobPage, {
      mainCatData: this.catergoryData,
      CatData: item,
      type: "1",
    });
  }

  search(ev: any) {
    const val = ev.target.value;
    console.log(val);
    console.log(this.subCatergories);
    if (val && val.trim() != "") {
      this.subCatergories = this.subCatergories.filter((name) => {
        console.log(name);
        return name.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.subCatergories = this.temp_subcatergories;
    }
  }

  reset() {
    this.subCatergories = this.temp_subcatergories;
  }

  CloseBtn() {
    this.navCtrl.pop();
  }
}

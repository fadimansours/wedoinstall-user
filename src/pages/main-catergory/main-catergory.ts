import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ConfigProvider } from "../../providers/config/config";
import { ServiceProvider } from "../../providers/service/service";
import { RequestJobPage } from "../request-job/request-job";
import { SubSearchPage } from "../sub-search/sub-search";

/**
 * Generated class for the MainCatergoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-main-catergory",
  templateUrl: "main-catergory.html",
})
export class MainCatergoryPage {
  catergoryImage;
  imgs;
  catergoryData: any;
  catergoryName: any;

  subCatergories: any = [];
  labels: any;
  labelArray: any;
  sub: any = [];
  searchName: any;
  temp_subcatergories: any;
  lenghtOfSubCat: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    private service: ServiceProvider,
    private alert: AlertProvider
  ) {}

  ionViewDidLoad() {
    this.catergoryData = this.navParams.get("catData");
    console.log("caterory data", this.catergoryData);
    this.catergoryImage = this.catergoryData.image;
    this.catergoryName = this.catergoryData.name;
    this.labels = this.catergoryData.label;
    console.log("label", this.labels);
    this.splitLabel();
    this.loadSubCat();
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "flex";
      });
    }
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }

  splitLabel() {
    this.labelArray = this.labels.split(",");
  }

  loadSubCat() {
    let params = {
      id: this.catergoryData.id,
    };
    this.alert.showLoader("");
    this.service.SubCategory(params).then((result: any) => {
      if (result.data) {
        this.sub = result.data;
        this.lenghtOfSubCat = result.data.length;
        console.log(result.data);
        this.labelArray.forEach((element) => {
          var sub = result.data.filter((x) => x.label === element);
          if (sub.length > 0) {
            var item = {
              label: element,
              data: sub,
            };

            this.subCatergories.push(item);
          }
        });
      }
      this.temp_subcatergories = this.subCatergories;
      this.alert.dissmissLoader();
      console.log("sub catergories", this.subCatergories);
    });
  }
  onClickSub(item) {
    console.log("selected item", item);
    this.navCtrl.push(RequestJobPage, {
      mainCatData: this.catergoryData,
      CatData: item,
      isPackage: false,
      type: "1",
    });
  }
  onClickCustomJob() {
    this.navCtrl.push(RequestJobPage, {
      CatData: this.catergoryData,
      mainCatData: this.catergoryData,
      isPackage: false,

      type: "2",
    });
  }

  onSearchClick() {
    if (this.lenghtOfSubCat > 0) {
      this.navCtrl.push(SubSearchPage, {
        data: this.sub,
        length: this.lenghtOfSubCat,
        mainData: this.catergoryData,
      });
    } else {
      this.alert.showToast("no sub catergories available");
    }
  }
}

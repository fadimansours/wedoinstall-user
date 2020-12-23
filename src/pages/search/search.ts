import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ConfigProvider } from "../../providers/config/config";
import { ProductListPage } from "../product-list/product-list";
import { MainCatergoryPage } from "../main-catergory/main-catergory";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html",
})
export class SearchPage {
  ServicProduc: string = "service";
  searchQuery: string = "";

  CategoryList: any;
  items: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider
  ) {}
  ngAfterViewInit() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }
  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "flex";
      });
    }
  }

  ionViewDidLoad() {
    console.log("Search Page");
    console.log("ion did load");
    this.SearchValue();
  }

  SearchValue() {
    this.alert.showLoader("");
    this.service.CategoryGet().then((results) => this.HandleCategory(results));
  }

  HandleCategory(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.CategoryList = results.data;
      this.items = results.data;
    } else {
      this.alert.showAlert("Error", "Something Went Wrong!");
    }
  }

  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);
    console.log(this.CategoryList);
    if (val && val.trim() != "") {
      this.items = this.items.filter((name) => {
        console.log(name);
        return name.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.items = this.CategoryList;
    }
  }

  SubCat(id) {
    var scg = this.items[id];

    this.navCtrl.push(MainCatergoryPage, { catData: scg });
  }

  Productshow(id) {
    var scg = this.items[id];
    this.navCtrl.push(ProductListPage, { CatId: scg });
  }

  CloseBtn() {
    this.navCtrl.setRoot(TabsPage);
  }
}

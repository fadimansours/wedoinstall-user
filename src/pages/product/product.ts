import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProductDetailPage } from "../product-detail/product-detail";
import { ServiceProvider } from "../../providers/service/service";
import { AlertProvider } from "../../providers/alert/alert";

@IonicPage()
@Component({
  selector: "page-product",
  templateUrl: "product.html",
})
export class ProductPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ServiceProvider,
    private alert: AlertProvider
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
    console.log("Product Page");
    // this.ProductGet()
  }

  ProductGet() {
    this.alert.showLoader("");
    var params = {
      cat_id: "1",
    };
    console.log(params);
    this.service
      .GetProduct(params)
      .then((results) => this.HandleProduct(results));
  }

  HandleProduct(results) {
    this.alert.dissmissLoader();
    console.log(results);
    if (results.ResponseCode == 1) {
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  ProductDetail() {
    this.navCtrl.push(ProductDetailPage);
  }
}

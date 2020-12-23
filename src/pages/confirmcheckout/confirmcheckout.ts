import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ConfigProvider } from "../../providers/config/config";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-confirmcheckout",
  templateUrl: "confirmcheckout.html",
})
export class ConfirmcheckoutPage {
  tabBarElement: any;
  UserData: any;
  UserId: any;
  CartList: any;
  quantity: any;
  TotalPrice: any;
  issave: any;
  Checkoutdata: any;
  user_id: any;
  total: any;
  address: any;
  payment_type: any;
  payment_type_name: any;
  SelectPay;
  LastId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertProvider,
    public service: ServiceProvider,
    public config: ConfigProvider,
    private alertCtrl: AlertController
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
  }

  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "none";
    }
  }
  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "flex";
    }
  }

  ionViewDidLoad() {
    this.Checkoutdata = this.navParams.get("Checkoutdata");

    this.user_id = this.Checkoutdata.user_id;
    this.total = this.Checkoutdata.total;
    this.address = this.Checkoutdata.address;
    this.payment_type = this.Checkoutdata.payment_type;

    if (this.Checkoutdata.payment_type == 1) {
      this.payment_type_name = "Cash On Delivery";
    } else if (this.Checkoutdata.payment_type == 2) {
      this.payment_type_name = "Card On Delivery";
    } else if (this.Checkoutdata.payment_type == 3) {
      this.payment_type_name = "Paypal";
    } else if (this.Checkoutdata.payment_type == 4) {
      this.payment_type_name = "Credit & Debit Cards";
    }

    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
    }
    this.GettoCart();
  }

  GettoCart() {
    this.alert.showLoader("");
    var params = {
      user_id: this.UserId,
    };
    console.log(params);
    this.service.GetCart(params).then((results) => this.HandleAddcart(results));
  }

  HandleAddcart(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.CartList = results.data;

      let totalpri = 0;
      for (let cart of this.CartList) {
        totalpri = totalpri + parseInt(cart.price) * parseInt(cart.qty);
        // this.allcart_price = totalprice
        this.TotalPrice = totalpri;
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  CheckOut() {
    this.alert.showLoader("");
    var params = {
      user_id: this.user_id,
      total: this.total,
      address: this.address,
      payment_type: this.Checkoutdata.payment_type,
    };
    console.log(params);
    this.service
      .BookProduc(params)
      .then((results) => this.HandleCheckout(results));
  }

  HandleCheckout(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      if (this.SelectPay == "3") {
        this.LastId = results.order_id;
      } else {
        this.navCtrl.setRoot(TabsPage);
        this.alert.showAlert("Success", results.ResponseMsg);
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }
}

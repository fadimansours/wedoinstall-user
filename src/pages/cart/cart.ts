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
import { CheckoutPage } from "../checkout/checkout";
import { cartService } from "../../providers/service/cartService";
import { RequestProductPage } from "../request-product/request-product";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html",
})
export class CartPage {
  tabBarElement: any;
  UserData: any;
  UserId: any;
  cartList: any = [];
  quantity: any;
  totalPrice: number = 0;
  issave: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertProvider,
    public service: ServiceProvider,
    public config: ConfigProvider,
    private alertCtrl: AlertController,
    private cartService: cartService
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
    console.log("Cart Page");
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
    }
    if (localStorage.getItem("cart")) {
      this.cartList = JSON.parse(localStorage.getItem("cart"));
      console.log("cart", this.cartList);
      this.calTotal();
    }

    //this.GettoCart()
  }

  /*   GettoCart() {
    this.alert.showLoader("")
    var params = {
      user_id: this.UserId
    }
    console.log(params)
    this.service.GetCart(params)
      .then((results) => this.HandleAddcart(results))
  }

  HandleAddcart(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.cartList = results.data

      let totalpri = 0;
      for (let cart of this.cartList) {
        totalpri = totalpri + parseInt(cart.price) * parseInt(cart.qty);
        // this.allcart_price = totalPrice
        this.totalPrice = totalpri
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  } */

  RemoveConfirm(i) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      message: "Do you want to Remove this item?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.RemoveCat(i);
            console.log("Buy clicked");
          },
        },
      ],
    });
    alert.present();
  }

  RemoveCat(ide) {
    this.alert.showLoader("");
    var params = {
      id: ide,
    };
    console.log(params);
    this.service
      .RemoveCart(params)
      .then((results) => this.HandleDeletcart(results));
  }

  HandleDeletcart(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      //this.GettoCart()
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  QutityUpdate(upid, qty, buttonid) {
    this.issave = buttonid;
    this.quantity = parseInt(qty);
    console.log(upid);
    if (this.issave == 1) {
      this.quantity = parseInt(qty) + 1;
      this.Update(upid);
    } else if (this.issave == 0) {
      if (this.quantity > 1) {
        this.quantity = parseInt(qty) - 1;
        this.Update(upid);
      }
    }
  }

  Update(upid) {
    this.alert.showLoader("");
    var params = {
      id: upid,
      qty: this.quantity,
    };
    console.log(params);
    this.service
      .UpdateCart(params)
      .then((results) => this.HandleCartUp(results));
  }

  HandleCartUp(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("success");
      // this.GettoCart()
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  CheckOut() {
    this.navCtrl.push(RequestProductPage, { cart: this.cartList });
  }

  HandleCheckout(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("success");
      //this.GettoCart()
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  calTotal() {
    if (this.cartList) {
      this.totalPrice = 0;
      this.cartList.forEach((item) => {
        if (item.totalPrice) {
          var price = item.totalPrice * item.quantity;
          this.totalPrice += price;
        }
        console.log("cart", this.cartList);
      });
    }
  }

  removeProduct(product) {
    console.log("remove product");
    this.cartService.removeProduct(product);
  }

  decreaseQty(product) {
    product.quantity--;
    this.calTotal();
  }
  increaseQty(product) {
    product.quantity++;
    this.calTotal();
  }
}

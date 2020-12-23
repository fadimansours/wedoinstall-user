import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "../config/config";
import "rxjs/add/operator/map";
import { ServiceProvider } from "./service";
import { AlertProvider } from "../alert/alert";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class cartService {
  url: string;
  newurl: string;
  userId: string;
  public userDetail: any;
  cart: any;
  public cartItemCount = new BehaviorSubject(0);

  constructor(
    public http: HttpClient,
    private config: ConfigProvider,
    public service: ServiceProvider,
    private alertService: AlertProvider
  ) {
    this.url = this.config.url;
    this.userId = this.config.loginId;
  }

  getCart() {
    return this.cart;
  }
  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    for (let item of cart) {
      if (item.productId === product.productId) {
        item.quantity = product.quantity;
        item.totalPrice = product.totalPrice;
        item.withDisposal = product.withDisposal;
        item.withDelivery = product.withDelivery;
        item.withInstallation = product.withInstallation;
        added = true;
        break;
      }
    }
    if (!added) {
      cart.push(product);
      this.cartItemCount.next(this.cartItemCount.value + 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  removeProduct(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let [index, item] of cart.entries()) {
      if (item.productId === product.productId) {
        cart.splice(index, 1);
        this.cartItemCount.next(this.cartItemCount.value - 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  increaseQuantity(item, product) {
    if (item.qty > item.quantity) {
      item.quantity += 1;
      product.quantity = item.quantity;
    } else {
      this.alertService.showToast("maximum quantity reached for product");
    }
  }

  decreaseQuantity() {}
}

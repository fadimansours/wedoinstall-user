import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConfigProvider } from "../../providers/config/config";
import { CartPage } from "../cart/cart";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { cartService } from "../../providers/service/cartService";
import { BehaviorSubject } from "rxjs";

@IonicPage()
@Component({
  selector: "page-product-detail",
  templateUrl: "product-detail.html",
})
export class ProductDetailPage {
  tabBarElement: any;
  ProductImage: any;
  productLogo: any;
  productName: any;
  productPrice: any;
  productLink: any;
  vendorName: any;
  ProductDescri: any;
  quantity: any;
  issave: any;
  UserData: any;
  UserId: any;
  productId: any;
  withInstallation: boolean = false;
  withDisposal: boolean = false;
  ProductImage2;
  ProductImage3;
  services_delivery;
  deliveryCharge: any;
  installationCharge: any;
  withDelivery: boolean = false;
  disposalCharge: any;
  totalPrice: number;
  availableQuantity: number;
  product: any = {};
  cartItemCount: BehaviorSubject<number>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public alert: AlertProvider,
    public service: ServiceProvider,
    public cartService: cartService
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
    this.quantity = 1;
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
    console.log("Product-Detail Page");
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
    }
    this.cartItemCount = this.cartService.getCartItemCount();

    this.product = this.navParams.get("Product");
    console.log(this.product);
    this.ProductImage = this.product.image;
    this.ProductImage2 = this.product.image2;
    this.ProductImage3 = this.product.image2;
    this.productLogo = this.product.logo;
    this.productName = this.product.name;
    this.productPrice = parseInt(this.product.price);
    this.productLink = this.product.item_link;
    this.ProductDescri = this.product.description;
    this.vendorName = this.product.vendor_name;
    this.productId = this.product.id;
    this.deliveryCharge = parseInt(this.product.amount); //delievry charge
    this.installationCharge = parseInt(this.product.price_with_installation); //installation price
    this.disposalCharge = parseInt(this.product.disposal_amount);
    this.availableQuantity = parseInt(this.product.qty);
    this.product.quantity = 1;
    this.totalPrice = this.productPrice;
  }

  Cart() {
    this.navCtrl.push(CartPage);
  }

  Update(upid) {
    this.issave = upid;
    if (this.issave == 1) {
      this.quantity++;
    } else if (this.issave == 0) {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }

  AddtoCart() {
    console.log(this.withInstallation);

    var instalwith;
    if (this.withInstallation == true) {
      instalwith = "1";
    } else {
      instalwith = "0";
    }

    var delivery;

    if (this.services_delivery == true) {
      delivery = "1";
    } else {
      delivery = "0";
    }

    var disposal_status;

    if (this.withDisposal == true) {
      disposal_status = "1";
    } else {
      disposal_status = "0";
    }

    this.alert.showLoader("");
    var params = {
      product_id: this.productId,
      user_id: this.UserId,
      qty: this.quantity,
      withInstallationllation: instalwith,
      services_delivery: delivery,
      disposal: disposal_status,
    };
    console.log(params);
    this.service
      .AddtCart(params)
      .then((results) => this.HandleAddcart(results));
  }

  HandleAddcart(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.alert.showAlert("Success", results.ResponseMsg);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  /* clickInstallation() {
    this.withInstallation = !this.withInstallation;
    this.calCost();
  }

  clickDisposal() {
    this.disposal = !this.disposal;
    this.calCost();
  }

  clickDelivery() {
    this.delivery = !this.delivery;
    this.calCost();
  }
 */
  calCost() {
    var installationPrice = 0;
    var disposalPrice = 0;
    var deliveryPrice = 0;

    if (this.withInstallation) {
      installationPrice = this.installationCharge;
    }
    if (this.withDisposal) {
      disposalPrice = this.disposalCharge;
    }
    if (this.withDelivery) {
      deliveryPrice = this.deliveryCharge;
    }

    this.totalPrice =
      this.productPrice + installationPrice + disposalPrice + deliveryPrice;
  }

  addProduct() {
    if (this.availableQuantity > this.product.quantity) {
      this.product.quantity++;
    } else {
      this.alert.showToast("maximum quantity reached for product");
    }
  }

  removeProduct(item) {
    this.product.quantity--;
  }

  addToCart() {
    let product = {
      productName: this.productName,
      productId: this.productId,
      userId: this.product.user_id,
      itemNumber: this.product.item_number,
      productPrice: this.productPrice,
      initialPrice: this.productPrice,
      totalPrice: this.totalPrice,
      ProductDescription: this.ProductDescri,
      quantity: this.product.quantity,
      availableQuantity: this.availableQuantity,
      sku: this.product.sku,
      vendorName: this.vendorName,
      productLogo: this.productLogo,
      linkAt: this.productLink,
      merchantId: this.product.merchant_id,
      storeNumber: this.product.store_number,
      installationCharge: this.installationCharge,
      disposalCharge: this.disposalCharge,
      deliveryCharge: this.deliveryCharge,
      withDisposal: this.withDisposal,
      withDelivery: this.withDelivery,
      withInstallation: this.withInstallation,
      image1: this.product.image ? this.product.image : null,
      image2: this.product.image2 ? this.product.image2 : null,
      image3: this.product.image3 ? this.product.image3 : null,
    };

    this.cartService.addProduct(product);
  }
}

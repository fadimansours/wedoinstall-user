import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  OrderId: any;
  tabBarElement: any;
  DetailOrder: any;
  OdrImage: any;
  OdrLogo: any;
  OdrName: any;
  OdrPrice: any;
  OdrVendor: any;
  OdrLink: any;
  OdrDelivery: any;
  OdrAddress: any;
  PaymentType: any;
  TotalPrice: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider
  ) {
    if (document.querySelector('.tabbar')) { this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); }
  }
  ionViewWillEnter() {
    if (this.tabBarElement) { this.tabBarElement.style.display = 'none'; }
  }
  ionViewWillLeave() {
    if (this.tabBarElement) { this.tabBarElement.style.display = 'flex'; }
  }

  ionViewDidLoad() {
    console.log('Order-Detail Page');
    var Orderd = this.navParams.get('orderid')
    this.OrderId = Orderd.id
    this.OdrAddress = Orderd.address
    this.PaymentType = Orderd.payment_type
    this.OrderDetail()
  }

  OrderDetail() {
    this.alert.showLoader("")
    var params = {
      id: this.OrderId
    }
    console.log(params)
    this.service.OrderDetail(params)
      .then((results) => this.HandleOrder(results))
  }

  HandleOrder(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.DetailOrder = results.data
      var Detairder = results.data[0]
      console.log(this.DetailOrder)
      // this.OdrImage = this.DetailOrder.image
      // this.OdrLogo = this.DetailOrder.logo
      // this.OdrName = this.DetailOrder.name
      // this.OdrPrice = this.DetailOrder.price
      // this.OdrVendor = this.DetailOrder.vendor_name
      // this.OdrLink = this.DetailOrder.item_link
      this.OdrDelivery = Detairder.services_delivery
      let totalpri = 0;
      for (let cart of this.DetailOrder) {
        totalpri = totalpri + parseInt(cart.price) * parseInt(cart.qty);
        // this.allcart_price = totalprice
        this.TotalPrice = totalpri
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

}

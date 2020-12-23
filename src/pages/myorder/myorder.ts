import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';
import { OrderDetailPage } from '../order-detail/order-detail';

@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {

  UserData: any;
  UserId: any;
  OrderList: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider
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
    console.log('Myorder Page');
    if (localStorage.getItem('Trades_globe')) {
      this.UserData = JSON.parse(localStorage.getItem('Trades_globe'));
      this.UserId = this.UserData.id
    }
    this.OrderGet()
  }

  OrderGet() {
    this.alert.showLoader("")
    var params = {
      user_id: this.UserId
    }
    console.log(params)
    this.service.GetOrder(params)
      .then((results) => this.HandleOrder(results))
  }

  HandleOrder(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.OrderList = results.data
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  OrderDetail(i) {
    var id = this.OrderList[i]
    this.navCtrl.push(OrderDetailPage, { "orderid": id })
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentAddPage } from '../payment-add/payment-add';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-payment-detail',
  templateUrl: 'payment-detail.html',
})
export class PaymentDetailPage {

  UserData: any;
  UserId: any;
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
    console.log('Payment-Detail Page');
    if (localStorage.getItem('Trades_globe')) {
      this.UserData = JSON.parse(localStorage.getItem('Trades_globe'));
      this.UserId = this.UserData.id
    }
    this.CardShow()
  }

  CardShow() {
    this.alert.showLoader('')
    var params = {
      user_id: this.UserId
    }
    console.log(params)
    this.service.CardGet(params)
      .then((results) => this.HandleCardList(results))
  }

  HandleCardList(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {

    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  AddPayment() {
    this.navCtrl.push(PaymentAddPage)
  }
}

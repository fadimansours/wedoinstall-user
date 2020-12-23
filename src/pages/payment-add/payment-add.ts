import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-payment-add',
  templateUrl: 'payment-add.html',
})
export class PaymentAddPage {

  tabBarElement: any;
  Card_Number: any;
  Card_Expiry: any;
  Card_Cvvcvc: any;
  UserData: any;
  UserId: any;

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
    console.log('Payment-Add Page');
    if (localStorage.getItem('Trades_globe')) {
      this.UserData = JSON.parse(localStorage.getItem('Trades_globe'));
      this.UserId = this.UserData.id
    }
  }

  SaveCard() {
    if (this.validate()) {
      this.alert.showLoader('')
      var params = {
        card_number: this.Card_Number,
        expiry: this.Card_Expiry,
        cvc: this.Card_Cvvcvc,
        user_id: this.UserId
      }
      console.log(params)
      this.service.CardAdd(params)
        .then((results) => this.HandleCard(results))
    }
  }

  HandleCard(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.alert.showAlert("Card add Successfully", '')
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  validate() {
    if (!this.Card_Number) {
      this.alert.showAlert("Attention", "Please enter valid Card Number!")
      return false;
    } else if (!this.Card_Expiry) {
      this.alert.showAlert("Attention", "Please enter valid Card Expiry Date!")
      return false;
    } else if (!this.Card_Cvvcvc) {
      this.alert.showAlert("Attention", "Please enter valid CVV / CVC!")
      return false;
    }
    return true;
  }

}

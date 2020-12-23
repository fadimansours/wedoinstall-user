import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { AddressDetailPage } from '../address-detail/address-detail';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';
import { Stripe } from '@ionic-native/stripe';
import { TabsPage } from '../tabs/tabs';
import { ConfirmcheckoutPage } from '../confirmcheckout/confirmcheckout';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  UserAddress: any;
  tabBarElement: any;
  SelectPay: any;
  TotalPay: any;
  UserData: any;
  UserId: any;
  card_number: any;
  card_month: any;
  card_year: any;
  card_cvc: any;
  LastId: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private config: ConfigProvider,
    private modalCtrl: ModalController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    private stripe: Stripe
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
    console.log('Checkout Page');
    this.TotalPay = this.navParams.get('Total')
    if (localStorage.getItem('Trades_globe')) {
      this.UserData = JSON.parse(localStorage.getItem('Trades_globe'));
      this.UserId = this.UserData.id
    }
    if (this.config.UserAddress) {
      this.UserAddress = this.config.UserAddress
    } else {
      this.UserAddress = 'Add address'
    }
  }

  ChangeAddrs() {
    let AddressModal = this.modalCtrl.create(AddressDetailPage, { "selecadd": 'selec' });
    AddressModal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.UserAddress = data
      }
    });
    AddressModal.present();
  }

  PaymentOption(id) {
    if (id == '1') {
      this.SelectPay = '1'
    } else if (id == '2') {
      this.SelectPay = '2'
    } else if (id == '3') {
      this.SelectPay = '3'
    }else if (id == '4') {
      this.SelectPay = '4'
    }else if (id == '5') {
      this.SelectPay = '5'
    }
  }

  ContinuePay() {
    if (this.UserAddress == 'Add address') {
      this.alert.showAlert("Error", 'Please Enter Valid Address!')
    } else {
		
	/*	
      if (this.SelectPay == '1') {
        this.PaymentRun('1')
      } else if (this.SelectPay == '2') {
        this.PaymentRun('2')
      } else if (this.SelectPay == '3') {
        this.PaymentRun('3')
      } else if (this.SelectPay == '4') {
        this.PaymentRun('4')
      } else if (this.SelectPay == '5') {
        this.PaymentRun('5')
      }
	*/  
	
	 var params = {
		user_id: this.UserId,
		total: this.TotalPay,
		address: this.UserAddress,
		payment_type: this.SelectPay
		}
	  
	  
	  this.navCtrl.push(ConfirmcheckoutPage, { "Checkoutdata": params });
	  
    }
  }

  PaymentRun(pty) {
    this.alert.showLoader("")
    var params = {
      user_id: this.UserId,
      total: this.TotalPay,
      address: this.UserAddress,
      payment_type: pty
    }
    console.log(params)
    this.service.BookProduc(params)
      .then((results) => this.HandleCheckout(results))
  }

  HandleCheckout(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      if (this.SelectPay == '3') {
        this.LastId = results.order_id
      } else {
        this.navCtrl.setRoot(TabsPage)
        this.alert.showAlert("Success", results.ResponseMsg)
      }
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  StripePay() {
    this.stripe.setPublishableKey('pk_test_Bu3c9VqObx17WvfO6IW1CmRU');
    if (this.validate()) {
      this.alert.showLoader("")
      let card = {
        number: this.card_number,
        expMonth: this.card_month,
        expYear: this.card_year,
        cvc: this.card_cvc
      };
      this.stripe.createCardToken(card)
        .then(token => {
          console.log(token)
          this.TokenID(token)
        })
        .catch(error => console.error(error));
    }
  }

  TokenID(token) {
    var email = this.config.Email
    var params = {
      stripeToken: token.id,
      email: email,
      amount: this.TotalPay,
      last_id: this.LastId
    }
    console.log(params)
    this.service.ProductStripe(params)
      .then((results) => this.Handlescrep(results))
  }

  Handlescrep(results) {
    console.log(results)
    this.alert.dissmissLoader()
    console.log(results.status)
    if (results.status == 'succeeded') {
      this.navCtrl.setRoot(TabsPage)
      this.alert.showAlert("Success", results.ResponseMsg)
    } else {
      this.alert.showAlert('Error', results.status)
    }
  }

  validate() {
    if (!this.card_number) {
      this.alert.showAlert("Attention", "Please enter valid Card Number!")
      return false;
    } else if (!this.card_month) {
      this.alert.showAlert("Attention", "Please enter valid Card Expiry Month!")
      return false;
    } else if (!this.card_year) {
      this.alert.showAlert("Attention", "Please enter valid Card Expiry Year!")
      return false;
    } else if (!this.card_cvc) {
      this.alert.showAlert("Attention", "Please enter valid Card CVC!")
      return false;
    }
    return true;
  }

}

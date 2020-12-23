import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { ConfigProvider } from '../../providers/config/config';
import { RequestJobPage } from '../request-job/request-job';

@IonicPage()
@Component({
  selector: 'page-discount-offers',
  templateUrl: 'discount-offers.html',
})
export class DiscountOffersPage {

  tabBarElement: any;
  UserAddress: any;
  StreakList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: ServiceProvider,
    private config: ConfigProvider
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
    console.log('Discount-Offers Page');
    this.UserAddress = this.config.UserAddress
    this.Streak()
  }

  Streak() {
    var params = {
      address: this.UserAddress
    }
    console.log(params)
    this.service.GetStreak(params)
      .then((results) => this.HandleStreak(results))
  }

  HandleStreak(results) {
    console.log(results)
    if (results.ResponseCode == 1) {
      this.StreakList = results.data
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  DateSet(dt) {
    var nd = new Date(dt);
    var th = String(nd);
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var years = th.slice(11, 15);
    return day + ", " + month + " " + dates + " " + years
  }

  RescueStreak(data) {
    var skda = this.StreakList[data]
    this.navCtrl.push(RequestJobPage, { "CatId": skda })
    // let rescueModal = this.modalCtrl.create(RescueStreakPage);
    // rescueModal.onDidDismiss(data => {
    //   console.log(data);
    //   if (data) {
    //   }
    // });
    // rescueModal.present();
  }

}

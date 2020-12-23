import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestJobPage } from '../request-job/request-job';
import { ServiceProvider } from '../../providers/service/service';
import { AlertProvider } from '../../providers/alert/alert';
import { ConfigProvider } from '../../providers/config/config';
import { AdminChatPage } from '../admin-chat/admin-chat';

@IonicPage()
@Component({
  selector: 'page-seasonal-view',
  templateUrl: 'seasonal-view.html',
})
export class SeasonalViewPage {

  SeasonalList: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: ServiceProvider,
    private alert: AlertProvider,
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
    console.log('Seasonal-View Page');
    this.Seasonal()
  }

  Seasonal() {
    this.alert.showLoader("")
    this.service.GetSeasonal()
      .then((results) => this.HandleSeasonal(results))
  }

  HandleSeasonal(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.SeasonalList = results.data
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  BookSeason(i) {
    var scg = this.SeasonalList[i]
    this.navCtrl.push(RequestJobPage, { "CatId": scg })
  }

  AdminChat() {
    this.navCtrl.push(AdminChatPage)
  }

}

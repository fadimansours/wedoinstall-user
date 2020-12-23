import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestJobPage } from '../request-job/request-job';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';
import { ConfigProvider } from '../../providers/config/config';


@IonicPage()
@Component({
  selector: 'page-popular-view',
  templateUrl: 'popular-view.html',
})
export class PopularViewPage {

  tabBarElement: any;
  CategoryList: any;

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
    console.log('Popular-View Page');
    this.PopularJob();
  }

  PopularJob() {
    this.service.GetPopularJob()
      .then((results) => this.HandlePopular(results))
  }

  HandlePopular(results) {
    console.log(results)
    if (results.ResponseCode == 1) {
      console.log('success')
      this.CategoryList = results.data
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  Seasonam(id) {
    var scg = this.CategoryList[id]
    this.navCtrl.push(RequestJobPage, { "CatId": scg })
  }

}

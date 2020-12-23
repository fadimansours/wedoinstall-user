import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';
import { RequestJobPage } from '../request-job/request-job';

@IonicPage()
@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {

  CatogoryId: any;
  CatogoryName: any;
  CategoryList: any;
  Flashdeal: any;
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
    console.log('Sub-Category Page');
    var Catgory = this.navParams.get("CatId")
    this.Flashdeal = this.navParams.get("FlashId")
    if (Catgory) {
      this.CatogoryId = Catgory.id
      this.CatogoryName = Catgory.name
    } else if (this.Flashdeal) {
      this.CatogoryName = this.Flashdeal.title
      this.CatogoryId = this.Flashdeal.category
    }

    this.SubCato()
  }

  SubCato() {
    this.alert.showLoader("")
    var params = {
      id: this.CatogoryId
    }
    console.log(params)
    this.service.SubCategory(params)
      .then((results) => this.HandleCategory(results))
  }

  HandleCategory(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.CategoryList = results.data
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  RequestJob(id) {
    var SubCat = this.CategoryList[id]
    this.navCtrl.push(RequestJobPage, { "CatId": SubCat, "flash": this.Flashdeal })
  }

}
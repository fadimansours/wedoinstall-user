import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-rescue-streak',
  templateUrl: 'rescue-streak.html',
})
export class RescueStreakPage {

  CategoryList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alert: AlertProvider,
    private service: ServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('Rescue-Streak Page');
    this.SearchValue()

  }

  SearchValue() {
    this.alert.showLoader("")
    this.service.CategoryGet()
      .then((results) => this.HandleCategory(results))
  }

  HandleCategory(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      this.CategoryList = results.data
    } else {
      this.alert.showAlert("Error", "Something Went Wrong!")
    }
  }

  SubCat(ic) {
    var data = this.CategoryList[ic]
    this.viewCtrl.dismiss(data)
  }

  CloseBtn() {
    this.viewCtrl.dismiss()
  }

}

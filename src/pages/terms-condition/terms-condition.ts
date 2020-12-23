import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-terms-condition',
  templateUrl: 'terms-condition.html',
})
export class TermsConditionPage {

  CondisonHelp: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('Terms-Condition Page');
    this.CondisonHelp = this.navParams.get("LogSign")
  }

  Close() {
    var data = 'data';
    this.viewCtrl.dismiss(data)
  }

}

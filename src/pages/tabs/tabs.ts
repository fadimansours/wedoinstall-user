import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { JobsPage } from '../jobs/jobs';
import { ProfilePage } from '../profile/profile';
import { FlashDealPage } from '../flash-deal/flash-deal';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = HomePage
  tab2 = JobsPage
  tab3 = SearchPage
  tab4 = FlashDealPage
  tab5 = ProfilePage
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    events.subscribe('tab:clicked', (data) => {
      this.tabRef.select(data['tab']);
    });
  }

  ionViewDidLoad() {
    console.log('Tabs Page');
  }

}

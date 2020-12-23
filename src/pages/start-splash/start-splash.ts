import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-start-splash',
  templateUrl: 'start-splash.html',
})
export class StartSplashPage {
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
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
    console.log('Start-Splash Page');
  }

  Skip() {
    var x = Math.floor((Math.random() * 10000000) + 1);
    console.log(x)
    this.config.guestId = x
    this.navCtrl.setRoot(TabsPage)
  }

  Login() {
    this.navCtrl.push(LoginPage)
  }

  Signup() {
    this.navCtrl.push(SignUpPage)
  }

}

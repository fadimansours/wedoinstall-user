import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signin-modal',
  templateUrl: 'signin-modal.html',
})
export class SigninModalPage {

  Flashh: any;
  tabBarElement: any;
  LoginPagePas: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
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
    console.log('Signin-Modal Page');
    this.Flashh = this.navParams.get('tepshow')
    this.LoginPagePas = this.navParams.get('homeLogin')
    if (this.LoginPagePas == 'SignLong') {
      this.SignUp()
    } else if (this.LoginPagePas == 'LongSign') {
      this.Login()
    } else { }
  }

  CloseBtn() {
    this.viewCtrl.dismiss({ data: 'login' })
  }

  SignUp() {
    this.navCtrl.setRoot(SignUpPage)
  }

  Login() {
    this.navCtrl.setRoot(LoginPage)
  }

}

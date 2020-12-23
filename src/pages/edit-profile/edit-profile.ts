import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  firstname: any;
  lastname: any;
  phonenumber: any;
  email: any;
  UserData: any;
  UserId: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private config: ConfigProvider,
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
    console.log('Edit-Profile Page');
    this.firstname = this.config.FirstName;
    this.lastname = this.config.LastName;
    this.phonenumber = this.config.PhoneNumber;
    this.email = this.config.Email;
    if (localStorage.getItem('Trades_globe')) {
      this.UserData = JSON.parse(localStorage.getItem('Trades_globe'));
      this.UserId = this.UserData.id
    }
  }

  SaveProfile() {
    this.alert.showLoader("")
    var params = {
      name: this.firstname,
      last_name: this.lastname,
      mobile: this.phonenumber,
      email: this.email,
      user_id: this.UserId
    }
    console.log(params)
    this.service.EditProfil(params)
      .then((results) => this.HandleProfile(results))
  }

  HandleProfile(results) {
    console.log(results)
    this.alert.dissmissLoader()
    if (results.ResponseCode == 1) {
      console.log('success')
      this.alert.showAlert("Success Update", '')
      localStorage.setItem("Trades_globe", JSON.stringify(results.user_data))
      this.config.userlogin()
      this.firstname = this.config.FirstName;
      this.lastname = this.config.LastName;
      this.phonenumber = this.config.PhoneNumber;
      this.email = this.config.Email;
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

}

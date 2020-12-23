import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AddressAddPage } from "../address-add/address-add";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ViewController } from "ionic-angular/navigation/view-controller";

@IonicPage()
@Component({
  selector: "page-address-detail",
  templateUrl: "address-detail.html",
})
export class AddressDetailPage {
  tabBarElement: any;
  UserData: any;
  UserId: any;
  AddressList: any;
  SelectAdres: any;
  SelectAdresId: any;
  AddBtnShow: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public viewCtrl: ViewController
  ) {}
  ionViewWillEnter() {
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
    }
    var SelectAddew = this.navParams.get("selecadd");
    console.log(SelectAddew);
    if (SelectAddew == "selec") {
      this.AddBtnShow = "1";
    } else {
      this.AddBtnShow = "0";
    }
    console.log(this.AddBtnShow);
    this.MyAddres();
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }
  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".show-tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "flex";
      });
    }
  }

  ionViewDidLoad() {
    console.log("Address-Detail Page");
  }

  MyAddres() {
    this.alert.showLoader("");
    var params = {
      user_id: this.UserId,
    };
    console.log(params);
    this.service
      .AddressGet(params)
      .then((results) => this.HendalMyAddress(results));
  }

  HendalMyAddress(results) {
    console.log("user address", results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.AddressList = results.data;
      this.checkAddress();
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }
  checkAddress() {
    if (this.AddressList.length === 1) {
      this.SelectAdresId = this.AddressList[0].id;
      this.SelectAdres = 0;
    }
    console.log("default address id", this.SelectAdresId);
  }

  AddAddress() {
    this.navCtrl.push(AddressAddPage);
  }

  EditAddress() {
    console.log(this.SelectAdres);
    if (this.SelectAdresId) {
      var SubCat = this.AddressList[this.SelectAdres];
      var cateid = SubCat.id;
      for (var i = 0; i < this.AddressList.length; i++) {
        if (this.AddressList[i].id == cateid) {
          var addresin = this.AddressList[i];
        }
      }
      this.navCtrl.push(AddressAddPage, { EditAdrs: addresin });
    }
  }

  SelectAddress(ares, id) {
    console.log(ares, id);
    this.SelectAdres = ares;
    this.SelectAdresId = id;
  }

  AddressSelec() {
    console.log(this.SelectAdres);
    if (this.SelectAdresId) {
      var SubCat = this.AddressList[this.SelectAdres];
      var data = SubCat.address;
      this.viewCtrl.dismiss(data);
    }
  }
}

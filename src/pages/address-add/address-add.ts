import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { ConfigProvider } from "../../providers/config/config";
import { ServiceProvider } from "../../providers/service/service";
import { TabsPage } from "../tabs/tabs";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-address-add",
  templateUrl: "address-add.html",
})
export class AddressAddPage {
  tabBarElement: any;
  StreetAddress: any;
  UnitSuite: any;
  DefaultSet: boolean = true;
  UserData: any;
  UserId: any;
  EditData: any;
  EditAdresId: any;

  search_results: any;
  autocompleteFrom: any;
  autocompleteItemsFrom: any[];
  GoogleAutocomplete: any;
  mapSeggesAdres: any;
  firstTimeLogin: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public zone: NgZone,
    public config: ConfigProvider,
    public viewCtrl: ViewController
  ) {
    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
    this.DefaultSet = false;
    this.autocompleteFrom = {};
    this.autocompleteItemsFrom = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
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
        tabs[key].style.display = "none";
      });
    }
  }

  ionViewDidLoad() {
    console.log("Address-Add Page");
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
    }
    if (this.navParams.get("firstTimeLogin") == 0) {
      this.firstTimeLogin = true;
      this.DefaultSet = true;
      console.log("firt time login");
      console.log("firt time login", this.DefaultSet);
    }
    this.EditData = this.navParams.get("EditAdrs");
    if (this.EditData) {
      this.EditAdresId = this.EditData.id;
      this.StreetAddress = this.EditData.address;
      var deflot = this.EditData.is_default;
      if (deflot == "0") {
        this.DefaultSet = false;
      } else {
        this.DefaultSet = true;
      }
    }
  }

  updateSearchResultsFrom() {
    console.log(this.autocompleteFrom.input);
    this.search_results = false;
    if (this.autocompleteFrom.input == "") {
      this.autocompleteItemsFrom = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocompleteFrom.input },
      (predictions, status) => {
        console.log(status);
        this.autocompleteItemsFrom = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItemsFrom.push(prediction);
          });
        });
      }
    );
  }

  selectSearchResultFrom(newaddress: any) {
    console.log("new addres", newaddress);
    const address = newaddress.description;
    this.autocompleteFrom.input = address;
    this.mapSeggesAdres = address;
    console.log(address);
    this.search_results = true;
  }

  SaveAddres() {
    if (this.validate()) {
      if (this.StreetAddress) {
        var darr = this.StreetAddress + ", " + this.mapSeggesAdres;
      } else {
        var darr = "" + this.mapSeggesAdres;
      }
      var defolt;
      if (this.DefaultSet == false) {
        defolt = "0";
      } else {
        defolt = "1";
      }
      this.alert.showLoader("");
      var params = {
        user_id: this.UserId,
        address: darr,
        is_default: defolt,
      };
      console.log(params);
      this.service
        .AddressAdd(params)
        .then((results) => this.HendalAddress(results));
    }
  }

  HendalAddress(results) {
    console.log(results);
    this.runAgain();
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.viewCtrl.dismiss(results);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  validate() {
    /*  if (!this.StreetAddress) {
      this.alert.showAlert("Attention", "Please enter valid Unit/Suite!");
      return false;
    } else */ if (
      !this.mapSeggesAdres
    ) {
      this.alert.showAlert("Attention", "Please enter valid Street Address!");
      return false;
    }
    return true;
  }

  UpdateAddres() {
    var defolt;
    if (this.DefaultSet == false) {
      defolt = "0";
    } else {
      defolt = "1";
    }
    this.alert.showLoader("");
    var params = {
      id: this.EditAdresId,
      address: this.StreetAddress,
      is_default: defolt,
    };
    console.log(params);
    this.service
      .AddressUpdate(params)
      .then((results) => this.HendalUpdateAddres(results));
  }

  HendalUpdateAddres(results) {
    console.log(results);
    this.runAgain();
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.viewCtrl.dismiss(results);
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  runAgain() {
    var user = JSON.parse(localStorage.getItem("Trades_globe"));
    var params = {
      username: user.email,
      password: user.password,
      device_id: user.device_id,
    };
    console.log("after adding address", params);
    this.service.Logins(params).then((results: any) => {
      localStorage.setItem("Trades_globe", JSON.stringify(results.user_data));
    });
  }
}

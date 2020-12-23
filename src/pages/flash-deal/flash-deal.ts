import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { SigninModalPage } from "../signin-modal/signin-modal";
import { TabsPage } from "../tabs/tabs";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { ConversationPage } from "../conversation/conversation";
import { RequestJobPage } from "../request-job/request-job";
import { ConfigProvider } from "../../providers/config/config";
import { AdminChatPage } from "../admin-chat/admin-chat";
import { AddressDetailPage } from "../address-detail/address-detail";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-flash-deal",
  templateUrl: "flash-deal.html",
})
export class FlashDealPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  lat: number;
  lang: number;
  UserData: any;
  UserId: any;
  FlashDealis: any;
  ComplatShow: boolean;
  CategoryList: any;
  UserAddress: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alert: AlertProvider,
    private service: ServiceProvider,
    private config: ConfigProvider
  ) {}

  ionViewWillEnter() {
    if (this.config.loginId) {
      this.ComplatShow = false;
      if (localStorage.getItem("Trades_globe")) {
        this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
        this.UserId = this.UserData.id;
      }
      this.FlashDeal();
    } else {
      let modal = this.modalCtrl.create(SigninModalPage, { tepshow: "1" });
      modal.onDidDismiss((data) => {
        console.log(data);
        this.navCtrl.setRoot(TabsPage);
      });
      modal.present();
    }
  }

  ionViewDidLoad() {
    console.log("Flash-Deal Page");
    if (this.config.UserAddress) {
      this.UserAddress = this.config.UserAddress;
    } else {
      this.UserAddress = "Add address";
    }
  }

  FlashDeal() {
    this.alert.showLoader("");
    var params = {
      address: this.UserAddress,
    };
    console.log(params);
    this.service
      .FlashDeals(params)
      .then((results) => this.HandleFlashde(results));
  }

  HandleFlashde(results) {
    console.log(results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      console.log("success");
      this.FlashDealis = results.data;
      this.lat = results.userlatlong.userlat;
      this.lang = results.userlatlong.userlong;
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
    this.PopularJob();
    this.loadMap();
  }

  loadMap() {
    console.log(this.lat);
    console.log(this.lang);
    let latLng = new google.maps.LatLng(this.lat, this.lang);
    console.log(latLng);
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarkersToMap();
    this.getalllocation();
  }

  addMarkersToMap() {
    var position = new google.maps.LatLng(this.lat, this.lang);
    var dogwalkMarker = new google.maps.Marker({
      map: this.map,
      position: position,
      icon: {
        url: "assets/imgs/pinhome.png",
        scaledSize: new google.maps.Size(28, 28),
      },
    });
    dogwalkMarker.setMap(this.map);
  }

  getalllocation() {
    for (let i = 0; i < this.FlashDealis.length; i++) {
      this.addMarkers(this.FlashDealis[i]);
    }
  }

  addMarkers(latlong) {
    console.log(latlong);
    var position = new google.maps.LatLng(latlong.lati, latlong.longi);
    var dogwalkMarker = new google.maps.Marker({
      map: this.map,
      position: position,
      icon: {
        url: "assets/imgs/pinflash.png",
        scaledSize: new google.maps.Size(28, 28),
      },
    });
    dogwalkMarker.setMap(this.map);
  }

  Showhide(id) {
    if (id == 1) {
      this.ComplatShow = true;
    } else {
      this.ComplatShow = false;
    }
  }

  PopularJob() {
    this.service.CategoryGet().then((results) => this.HandlePopular(results));
  }

  HandlePopular(results) {
    console.log(results);
    if (results.ResponseCode == 1) {
      console.log("success");
      this.CategoryList = results.data;
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  RequestJob(flash) {
    let catData = {
      id: flash.subcategory,
      cat_id: flash.category,
      name: flash.serviceName,
      price: flash.price,
      description: flash.description,
      additional_hourly_rate: flash.additional_hourly_rate,
      pricedescription: flash.pricedescription,
      additionaldescription: flash.additionaldescription,
      picture: flash.image,
      icon: flash.icon,
      label: flash.label,
      point: flash.point,
    };

    let mainCatData = {
      id: flash.category,
      image: flash.mainCatImage,
      icon: flash.mainCatIcon,
    };

    this.navCtrl.push(RequestJobPage, {
      CatData: catData,
      mainCatData: mainCatData,
      flash: flash,
      type: "1",
    });
  }

  AdminChat() {
    this.navCtrl.push(AdminChatPage);
  }

  ChangeAddrs() {
    let AddressModal = this.modalCtrl.create(AddressDetailPage, {
      selecadd: "selec",
    });
    AddressModal.onDidDismiss((data) => {
      console.log(data);
      if (data) {
        this.UserAddress = data;
      }
    });
    AddressModal.present();
  }

  Chat() {
    this.navCtrl.push(ConversationPage);
  }
}

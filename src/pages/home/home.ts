import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Events,
} from "ionic-angular";
import { SearchPage } from "../search/search";
import { SigninModalPage } from "../signin-modal/signin-modal";
import { TabsPage } from "../tabs/tabs";
import { AvailableViewPage } from "../available-view/available-view";
import { SeasonalViewPage } from "../seasonal-view/seasonal-view";
import { RequestJobPage } from "../request-job/request-job";
import { PopularViewPage } from "../popular-view/popular-view";
import { RescueStreakPage } from "../rescue-streak/rescue-streak";
import { CreditPage } from "../credit/credit";
import { ConversationPage } from "../conversation/conversation";
import { AlertProvider } from "../../providers/alert/alert";
import { ServiceProvider } from "../../providers/service/service";
import { SocialSharing } from "@ionic-native/social-sharing";
import { ConfigProvider } from "../../providers/config/config";
import { AdminChatPage } from "../admin-chat/admin-chat";
import { AddressDetailPage } from "../address-detail/address-detail";
import { Geolocation } from "@ionic-native/geolocation";
import { ProductListPage } from "../product-list/product-list";
import { DiscountOffersPage } from "../discount-offers/discount-offers";
import { ProductDetailPage } from "../product-detail/product-detail";
import { CartPage } from "../cart/cart";
import { AddressAddPage } from "../address-add/address-add";
import { userService } from "../../providers/service/userService";
import { creditServiceProvider } from "../../providers/coupon-service/credit-service";
import { QuoteDetailPage } from "../quote-detail/quote-detail";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  lat: number;
  lang: number;
  UserData: any;
  UserId: any;
  FlashDealis: any;
  ReferRal: any;
  CategoryList: any;
  category1: any;
  category2: any;
  category3: any;
  category4: any;
  SeasonalList: any;
  StreakList: any;
  PopularList: any;
  categoryimg1: any;
  categoryimg2: any;
  categoryimg3: any;
  categoryimg4: any;
  UserAddress: any;
  livelat: any;
  livelang: any;
  ProductList: any;
  SEsonkeyName: any;
  categoryicon1: any;
  categoryicon2: any;
  categoryicon3: any;
  categoryicon4: any;
  FlashkeyName: any;
  ProductServiname: any;
  LocalKeyname: any;
  PopulaKeyname: any;
  tabBarElement: any = document.querySelector(".tabbar.show-tabbar");
  customPackages: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    private alert: AlertProvider,
    public service: ServiceProvider,
    private socialSharing: SocialSharing,
    public config: ConfigProvider,
    private Geolocation: Geolocation,
    public creditService: creditServiceProvider,
    private userService: userService
  ) {
    this.userService.loadUserDetails();
    console.log("user  data", this.config.getUserDetails());
  }

  ionViewDidLoad() {
    console.log("Home Page");
    if (this.config.UserAddress) {
      this.creditService.getCreditPointsBalnce();
      this.UserAddress = this.config.UserAddress;
    }

    /* if (this.config.getUserDetails().primary_address) {
      this.UserAddress = this.config.getUserDetails().primary_address;
    } */
    /*  if (this.config.loginId && !this.config.getUserDetails().primary_address) {
      console.log("no address");
      let addAddressModal = this.modalCtrl.create(AddressAddPage, {
        firstTimeLogin: 0,
      });
      addAddressModal.onDidDismiss((data) => {
        console.log("modal dismised");
        this.config.userlogin();
        this.UserAddress = this.config.UserAddress;
      });
      addAddressModal.present();
    }  */
    if (localStorage.getItem("Trades_globe")) {
      this.UserData = JSON.parse(localStorage.getItem("Trades_globe"));
      this.UserId = this.UserData.id;
      this.ReferRal = this.UserData.referral_code;
    }

    if (this.config.loginId) {
      this.FlashDeal();
      this.PopularJob();
      this.Streak();
      this.getPackages();
    }
    this.getLocation();

    this.UserPint();
  }
  ionViewWillLeave() {
    console.log("ion will leave");
  }

  getLocation() {
    this.Geolocation.getCurrentPosition()
      .then((res) => {
        let location =
          "lat " + res.coords.latitude + " lang " + res.coords.longitude;
        // console.log(location)
        this.livelat = res.coords.latitude;
        this.livelang = res.coords.longitude;
        this.ParsLocation();
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  UserPint() {
    var params = {
      user_id: this.UserId,
    };
    // console.log(params)
    this.service
      .UserPoint(params)
      .then((results) => this.HandleUserPoint(results));
  }

  HandleUserPoint(results) {
    // console.log(results)
    if (results.ResponseCode == 1) {
      localStorage.setItem("Trades_globe", JSON.stringify(results.data));
      this.config.userlogin();
    }
  }

  ParsLocation() {
    var params = {
      user_id: this.UserId,
      lati: this.livelat,
      longi: this.livelang,
    };
    // console.log(params)
    this.service
      .LiveLocation(params)
      .then((results) => this.HandleLiveLocatin(results));
  }

  HandleLiveLocatin(results) {
    // console.log(results)
  }

  FlashDeal() {
    this.alert.showLoader("");
    var params = {
      address: this.config.getUserDetails().primary_address,
    };
    // console.log(params)
    this.service
      .FlashDeals(params)
      .then((results) => this.HandleFlashde(results));
  }

  HandleFlashde(results) {
    console.log("flash deal", results);
    this.alert.dissmissLoader();
    if (results.ResponseCode == 1) {
      this.FlashDealis = results.data;
      this.lat = results.userlatlong.userlat;
      this.lang = results.userlatlong.userlong;
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
    this.loadMap();
  }

  loadMap() {
    // console.log(this.lat)
    // console.log(this.lang)
    let latLng = new google.maps.LatLng(this.lat, this.lang);
    // console.log(latLng)
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
        scaledSize: new google.maps.Size(26, 26),
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
    // console.log(latlong)
    var position = new google.maps.LatLng(latlong.lati, latlong.longi);
    var dogwalkMarker = new google.maps.Marker({
      map: this.map,
      position: position,
      title: latlong.business_name,
      icon: {
        url: "assets/imgs/pinflash.png",
        scaledSize: new google.maps.Size(26, 26),
      },
    });
    dogwalkMarker.setMap(this.map);
  }

  FlashMore() {
    if (!this.UserAddress) {
      this.ChangeAddrs();
    } else {
      this.events.publish("tab:clicked", { tab: 3 });
    }
  }

  SearchOpen() {
    this.navCtrl.push(SearchPage);
  }

  ShareRefer() {
    var message =
      "Sign up for Tradesdlobe using my promo code " +
      '"' +
      this.ReferRal +
      '"' +
      " to get $25 off your first Tradesglobe";
    this.socialSharing
      .share(message, "", "", "")
      .then(() => {
        // console.log('Success')
      })
      .catch(() => {
        console.log("Error");
      });
  }

  FlashdeJob(flash) {
    /* var SubCat = this.FlashDealis[id];
    var cateid = SubCat.category; */
    /*  for (var i = 0; i < this.CategoryList.length; i++) {
      if (this.CategoryList[i].id == cateid) {
        var catdada = this.CategoryList[i];
      }
    } */
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

  PopularJob() {
    this.service.GetPopularJob().then((results) => this.HandlePopular(results));
  }

  HandlePopular(results) {
    console.log("popolar service", results);
    if (results.ResponseCode == 1) {
      this.PopularList = results.data;
      if (this.PopularList[0]) {
        var Cate1 = this.PopularList[0];
        this.category1 = Cate1.name;
        this.categoryimg1 = Cate1.picture;
        this.categoryicon1 = Cate1.icon;
      }
      if (this.PopularList[1]) {
        var Cate2 = this.PopularList[1];
        this.category2 = Cate2.name;
        this.categoryimg2 = Cate2.picture;
        this.categoryicon2 = Cate2.icon;
      }
      if (this.PopularList[2]) {
        var Cate3 = this.PopularList[2];
        this.category3 = Cate3.name;
        this.categoryimg3 = Cate3.picture;
        this.categoryicon3 = Cate3.icon;
      }
      if (this.PopularList[3]) {
        var Cate4 = this.PopularList[3];
        this.category4 = Cate4.name;
        this.categoryimg4 = Cate4.picture;
        this.categoryicon4 = Cate4.icon;
      }
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
    this.Seasonal();
  }

  Seasonal() {
    this.service.GetSeasonal().then((results) => this.HandleSeasonal(results));
  }

  HandleSeasonal(results) {
    console.log("season", results);
    if (results.ResponseCode == 1) {
      this.SeasonalList = results.data;
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }

    this.CategoyGetJob();
    this.HomeConfig();
  }

  HomeConfig() {
    this.service.HomeConfig().then((results) => this.HandleConfih(results));
  }

  HandleConfih(results) {
    console.log(results);
    if (results.ResponseCode == 1) {
      var condata = results.data;
      for (var i = 0; i < condata.length; i++) {
        if (condata[i].id == "6") {
          this.SEsonkeyName = condata[i].key_name;
        }
        if (condata[i].id == "7") {
          this.LocalKeyname = condata[i].key_name;
        }
        if (condata[i].id == "8") {
          this.ProductServiname = condata[i].key_name;
        }
        if (condata[i].id == "9") {
          this.FlashkeyName = condata[i].key_name;
        }
        if (condata[i].id == "10") {
          this.PopulaKeyname = condata[i].key_name;
        }
      }
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  CategoyGetJob() {
    this.service
      .CategoryGet()
      .then((results) => this.HandleCategoyGetJob(results));
  }

  HandleCategoyGetJob(results) {
    // console.log(results)
    if (results.ResponseCode == 1) {
      this.CategoryList = results.data;
    }
  }

  Streak() {
    var params = {
      address: this.UserAddress,
    };
    // console.log(params)
    this.service
      .GetStreak(params)
      .then((results) => this.HandleStreak(results));
  }

  HandleStreak(results) {
    console.log("STREAK LIST", results);
    if (results.ResponseCode == 1) {
      this.StreakList = results.data;
    } else {
      // this.alert.showAlert("Error", results.ResponseMsg)
    }
    this.ProductGet();
  }

  getPackages() {
    var params = {
      address: this.UserAddress,
    };

    this.service.getPackages(params).then((results: any) => {
      console.log("packages", results);
      if (results.data) {
        this.customPackages = results.data;
      }
    });
  }
  clickPackage(item) {
    this.navCtrl.push(QuoteDetailPage, {
      QuoteData: item,
      isPackage: true,
    });
  }

  ProductGet() {
    this.alert.showLoader("");
    var params = {
      cat_id: "0",
    };
    // console.log(params)
    this.service
      .GetProduct(params)
      .then((results) => this.HandleProduct(results));
  }

  HandleProduct(results) {
    this.alert.dissmissLoader();
    // console.log(results)
    if (results.ResponseCode == 1) {
      this.ProductList = results.data;
    } else {
      this.alert.showAlert("Error", results.ResponseMsg);
    }
  }

  SignUp() {
    this.Check("SignLong");
  }

  Login() {
    this.Check("LongSign");
  }

  Check(sl) {
    let modal = this.modalCtrl.create(SigninModalPage, {
      tepshow: "1",
      homeLogin: sl,
    });
    modal.onDidDismiss((data) => {
      console.log(data);
      this.navCtrl.setRoot(TabsPage);
    });
    modal.present();
  }

  AvailableView() {
    this.navCtrl.push(DiscountOffersPage);
  }

  RescueStreak(streak) {
    let catData = {
      id: streak.subCategory,
      cat_id: streak.category,
      name: streak.serviceName,
      price: streak.price,
      description: streak.description,
      additional_hourly_rate: streak.additional_hourly_rate,
      pricedescription: streak.pricedescription,
      additionaldescription: streak.additionaldescription,
      picture: streak.image,
      icon: streak.icon,
      label: streak.label,
      point: streak.point,
    };

    let mainCatData = {
      id: streak.category,
      image: streak.mainCatImage,
      icon: streak.mainCatIcon,
    };

    this.navCtrl.push(RequestJobPage, {
      CatData: catData,
      mainCatData: mainCatData,
      streak: streak,
      type: "1",
    });
    // let rescueModal = this.modalCtrl.create(RescueStreakPage);
    // rescueModal.onDidDismiss(data => {
    //   console.log(data);
    //   if (data) {
    //   }
    // });
    // rescueModal.present();
  }

  SeasonalView() {
    this.navCtrl.push(SeasonalViewPage);
  }

  popularClick(id) {
    var scg = this.PopularList[id];
    let mainCatData = {
      id: scg.cat_id,
      image: scg.mainCatImage,
      icon: scg.mainCatIcon,
    };

    this.navCtrl.push(RequestJobPage, {
      CatData: scg,
      mainCatData: mainCatData,
      type: "1",
    });
  }

  BookSeason(seasonal) {
    let mainCatData = {
      id: seasonal.cat_id,
      image: seasonal.mainCatImage,
      icon: seasonal.mainCatIcon,
    };

    this.navCtrl.push(RequestJobPage, {
      CatData: seasonal,
      mainCatData: mainCatData,
      type: "1",
    });
  }

  PopularMore() {
    this.navCtrl.push(PopularViewPage);
  }

  PointView() {
    this.navCtrl.push(AvailableViewPage);
  }

  CreditView() {
    this.navCtrl.push(CreditPage);
  }

  Chat() {
    this.navCtrl.push(ConversationPage);
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
        this.FlashDeal();
        this.Streak();
        this.getPackages();
      }
    });
    AddressModal.present();
  }

  Product(idd) {
    var ids = {
      id: idd,
    };
    this.navCtrl.push(ProductListPage, { CatId: ids });
  }

  ProductDetail(id) {
    var scg = this.ProductList[id];
    this.navCtrl.push(ProductDetailPage, { Product: scg });
  }

  Cart() {
    this.navCtrl.push(CartPage);
  }
}

import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ChooseLanguagePage } from "../pages/choose-language/choose-language";

import firebase from "firebase";
import { OneSignal } from "@ionic-native/onesignal";
import { AlertProvider } from "../providers/alert/alert";
// import { TabsPage } from '../pages/tabs/tabs';
// import { HomePage } from '../pages/home/home';
// import { StartSplashPage } from '../pages/start-splash/start-splash';
var firebaseConfig = {
  apiKey: "AIzaSyAqH3-thdGu9gRW-Wz_aJyJbReYM9guECI",
  authDomain: "taskworld-28b39.firebaseapp.com",
  databaseURL: "https://taskworld-28b39.firebaseio.com",
  projectId: "taskworld-28b39",
  storageBucket: "taskworld-28b39.appspot.com",
  messagingSenderId: "508800785921",
  appId: "1:508800785921:web:359bc307f06074c85a6a00",
  measurementId: "G-9SSKYKM0VC",
};
firebase.initializeApp(firebaseConfig);

// ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.632875040825-291cohcqojeso7s8u2ljis5uvltooc76 --variable WEB_APPLICATION_CLIENT_ID=632875040825-40q33tep15sfa0c2kpbc4jdotuvka064.apps.googleusercontent.com

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  rootPage: any = ChooseLanguagePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public _notification: OneSignal,
    public alertService: AlertProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      this._notification.startInit(
        "eceac5d9-a948-43c0-8085-6fcd7dc1b9e4",
        "632875040825"
      );
      this._notification.inFocusDisplaying(
        this._notification.OSInFocusDisplayOption.InAppAlert
      );
      this._notification.setSubscription(true);
      this._notification.handleNotificationReceived().subscribe((jsonData) => {
        console.log("push notification data", jsonData);
        let msg = jsonData.payload.body;
        let title = jsonData.payload.title;
        let additionalData = jsonData.payload.additionalData;
        this.alertService.showAlert(title, msg);
      });
      this._notification.handleNotificationOpened().subscribe((jsonData) => {
        alert(jsonData.notification.payload.body);
      });
      this._notification.endInit();
    });
  }
}

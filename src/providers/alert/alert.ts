import { Injectable } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "ionic-angular";

@Injectable()
export class AlertProvider {
  loader: any;
  constructor(
    private alert: AlertController,
    private loadingController: LoadingController,
    private toastCtrl: ToastController
  ) {
    console.log("This AlertProvider Here");
  }

  showAlert(title, text) {
    let alert = this.alert.create({
      title: title,
      message: text,
      buttons: ["OK"],
    });
    alert.present();
  }

  showLoader(text) {
    this.loader = this.loadingController.create({
      content: text,
      duration: 10000,
    });
    this.loader.present();
  }

  showImgLoader(text) {
    this.loader = this.loadingController.create({
      spinner: "hide",
      content: '<img src="assets/icon/loader.gif" class="Loder-image">',
      duration: 30000,
      cssClass: "my-loading-class",
    });
    this.loader.present();
  }

  dissmissLoader() {
    this.loader.dismiss();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }
}

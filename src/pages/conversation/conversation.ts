import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ChatPage } from "../chat/chat";
import { AlertProvider } from "../../providers/alert/alert";
import firebase from "firebase";
import { ServiceProvider } from "../../providers/service/service";
import { ConfigProvider } from "../../providers/config/config";
import { ImageViewerController } from "ionic-img-viewer";

@IonicPage()
@Component({
  selector: "page-conversation",
  templateUrl: "conversation.html",
})
export class ConversationPage {
  tabBarElement: any;
  SigninData: any;
  UserId: any;
  ConversationID: any;
  converasations: any;
  userName: any;
  private _imageViewerCtrl: ImageViewerController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider,
    imageViewerCtrl: ImageViewerController
  ) {
    this._imageViewerCtrl = imageViewerCtrl;

    if (document.querySelector(".tabbar")) {
      this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    }
  }
  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "none";
    }
  }
  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "flex";
    }
  }

  ionViewDidLoad() {
    console.log("Conversation Page");
    this.SigninData = JSON.parse(localStorage.getItem("Trades_globe"));
    this.UserId = this.SigninData.id;
    console.log("User Id >", this.UserId);
    this.userName = this.SigninData.name;
    this.getConver();
  }

  getConver() {
    this.converasations = [];
    this.alert.showLoader("");
    var starCountRef = firebase.database().ref("Conversation/");
    starCountRef.on("value", (Conver) => {
      this.ConversationID = ConversationToArray(Conver);
      for (var i = 0; i < this.ConversationID.length; i++) {
        var temp = this.ConversationID[i].ConverID.split("_");
        if (temp[0] == this.UserId) {
          this.converasations.push(this.ConversationID[i]);
        } else if (temp[1] == this.UserId) {
          this.converasations.push(this.ConversationID[i]);
        }
      }

      if (this.converasations) {
        this.converasations.forEach((element: any) => {
          if (element.type === 1) {
            let params = {
              providerId: element.ProviderID,
            };
            this.service.getProviderDetail(params).then((result: any) => {
              console.log("conversaton details pro", result);
              if (result.ResponseCode === "1") {
                this.converasations[
                  this.converasations.indexOf(element)
                ].image = result.proData.image;
              }
            });
          } else {
            let params = {
              tecId: element.ProviderID,
            };
            this.service.getTechnicianDetail(params).then((result: any) => {
              console.log("conversaton details tec", result);
              if (result.ResponseCode === "1") {
                this.converasations[
                  this.converasations.indexOf(element)
                ].image = result.tecData.image;
              }
            });
          }
        });
      }

      console.log(this.ConversationID);
      console.log("conversation", this.converasations);

      this.alert.dissmissLoader();
      // this.CheckLoop()
    });
  }

  CheckLoop() {
    for (var i = 0; i < this.ConversationID.length; i++) {
      console.log(this.ConversationID[i].ConverID);

      if (this.ConversationID[i].ConverID.split("_", 1) == this.UserId) {
        console.log(
          this.ConversationID[i].ConverID.split("_", 1) + ">> is available 1"
        );
        var Converja = this.ConversationID[i].ConverID;
        console.log(Converja);
        break;
      } else if (this.ConversationID[i].ConverID == this.UserId) {
        console.log(this.ConversationID[i].ConverID + ">> is available 2");
        var newconver = this.ConversationID[i].ConverID;
        console.log(newconver);
        break;
      } else {
        if (i == this.ConversationID.length - 1) {
          console.log(" no conversation match, create new");
        }
      }
    }
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
  chaat(id, userChatName, providerId, providerName) {
    var NameSend;
    if (userChatName == this.userName) {
      NameSend = providerName;
    } else {
      NameSend = userChatName;
    }
    this.navCtrl.push(ChatPage, {
      id: providerId, //chat id
      name: NameSend, //provder name
      con_Uid: providerId, //provider id
    });
  }

  NameFirstLetter(name) {
    // console.log(name)
    if (name) {
      var i = name.toString();
      var newname = i.slice(0, 1);
      return newname;
    } else {
      return;
    }
  }

  ServiceName(nm, unm) {
    if (nm == this.userName) {
      return unm;
    } else {
      return nm;
    }
  }

  ServceDate(dt) {
    var th = String(dt);
    var day = th.slice(0, 3);
    var month = th.slice(4, 7);
    var dates = th.slice(8, 10);
    var hou = dt.slice(16, 18);
    var mnt = th.slice(19, 21);
    var hours = hou > 12 ? hou - 12 : hou;
    var newhours = hours < 10 ? "0" + hours : hours;
    var am_pm = hou >= 12 ? "PM" : "AM";
    var minutes = mnt;
    var timee = newhours + ":" + minutes + " " + am_pm;
    var dtr = day + ", " + month + " " + dates + ", " + timee;
    return dtr;
  }

  Chate() {
    this.navCtrl.push(ChatPage);
  }
}

export const ConversationToArray = (snapshot) => {
  let returnArr = [];
  snapshot.forEach((childSnapshot) => {
    let item = childSnapshot.val();
    returnArr.push(item);
  });
  return returnArr;
};

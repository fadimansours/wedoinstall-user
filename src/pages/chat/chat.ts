import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  ActionSheetController,
  ModalController,
  ViewController,
} from "ionic-angular";
import firebase from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { ConfigProvider } from "../../providers/config/config";
import { AlertProvider } from "../../providers/alert/alert";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { ImageViewerController } from "ionic-img-viewer";
import { ServiceProvider } from "../../providers/service/service";
import { userService } from "../../providers/service/userService";

@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html",
})
export class ChatPage {
  _imageViewerCtrl: ImageViewerController;

  @ViewChild(Content) content: Content;
  offStatus: boolean = false;

  SigninData: any;
  UserId: any;
  userName: any;
  serviceProviderId: any;
  Chat_Data = { nickname: "", message: "" };
  UserChat: any;
  ConversationID: any;
  Button_show: string;
  ChatCreateID: string;
  chatIDCheck: string;
  ConversID: string;
  ChatsID: string;
  OldChatId: any;
  serviceProviderName: any;
  Con_NaMe: any;
  User_con_ID: any;
  titleNameShow: any;
  MyImage: string;
  mynewurl: any;
  VideoUrl: string;
  chatType: any;
  isTecAssigned: any;
  serviceProviderImage: any;
  conversationType: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private transfer: FileTransfer,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public config: ConfigProvider,
    private alert: AlertProvider,
    private fileChooser: FileChooser,
    public FilePath: FilePath,
    imageViewerCtrl: ImageViewerController,
    private service: ServiceProvider,
    private userService: userService
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
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
    console.log("Chat Page");

    this.SigninData = JSON.parse(localStorage.getItem("Trades_globe"));
    console.log(this.SigninData);
    this.UserId = this.SigninData.id;
    this.userName = this.SigninData.name;
    this.Chat_Data.nickname = this.userName as string;
    console.log("User Id >", this.UserId);
    this.serviceProviderId = this.navParams.get("id");
    this.serviceProviderName = this.navParams.get("name");
    this.isTecAssigned = this.navParams.get("isTecAssigned");
    this.conversationType = this.navParams.get("convoType"); // 1 fot client & pro and 2 for tec & client

    this.getProviderDetail();

    this.getTecDetail();
    console.log("id is", this.serviceProviderId);
    console.log("user id", this.UserId);
    console.log("user name", this.userName);
    console.log("provider / tec name is", this.serviceProviderName);
    console.log("tec assigned is", this.isTecAssigned);
    console.log("conversation type", this.conversationType);

    this.chatType = this.navParams.get("type");

    console.log("UserChatID >", this.serviceProviderId);
    console.log(this.serviceProviderName);
    this.Con_NaMe = this.navParams.get("con_name");
    this.User_con_ID = this.navParams.get("con_Uid");
    this.getConver();

    if (this.chatType == 1) {
      let message = this.navParams.get("message");
      console.log("message length", message.length);

      this.Chat_Data.message = `job resheduled
      user :${this.userName as string}
      job id:${message.id}
      new date:${message.jdate}
      new time:${message.jtime} `;
      console.log("message", this.Chat_Data.message);
      this.send();
    }
    if (this.chatType == 2) {
      let message = this.navParams.get("message");
      this.Chat_Data.message = message;
      this.send();
    }
  }

  getProviderDetail() {
    console.log("pro id", this.serviceProviderId);
    var params = {
      providerId: this.serviceProviderId,
    };
    this.service.getProviderDetail(params).then((result: any) => {
      console.log("provider detail", result);
      if (result.ResponseCode === "1") {
        this.serviceProviderImage = result.proData.image;
      }
    });
  }
  getTecDetail() {
    console.log("tec id", this.serviceProviderId);
    var params = {
      tecId: this.serviceProviderId,
    };
    this.service.getTechnicianDetail(params).then((result: any) => {
      console.log("tec detail", result);
      if (result.ResponseCode === "1") {
        this.serviceProviderImage = result.tecData.photo;
      }
    });
  }

  getConver() {
    var starCountRef = firebase.database().ref("Conversation/");
    starCountRef.on("value", (Conver) => {
      this.ConversationID = ConversationToArray(Conver);
      console.log(this.ConversationID);
      this.CheckLoop();
    });
  }

  CheckLoop() {
    this.ChatCreateID = "";
    this.chatIDCheck = "";
    this.Button_show = "0";
    var MyUserID = this.UserId;
    var NewUesrID = this.serviceProviderId;
    this.ChatCreateID = MyUserID + "_" + NewUesrID;
    this.chatIDCheck = NewUesrID + "_" + MyUserID;
    console.log("1 =>", this.ChatCreateID);
    console.log("2 =>", this.chatIDCheck);

    if (this.ChatCreateID == this.chatIDCheck) {
      this.serviceProviderId = this.User_con_ID;
      this.CheckLoop();
    } else {
      for (var i = 0; i < this.ConversationID.length; i++) {
        console.log(this.ConversationID[i].ConverID);
        if (this.ConversationID[i].ConverID == this.ChatCreateID) {
          console.log(this.ChatCreateID + ">> is available 1");
          var N_E_W = this.ChatCreateID;
          this.ChatsID = "";
          this.GetOldChat(N_E_W);
          break;
        } else if (this.ConversationID[i].ConverID == this.chatIDCheck) {
          console.log(this.chatIDCheck + ">> is available 2");
          var T_H_I_S = this.chatIDCheck;
          this.ChatsID = "";
          this.GetOldChat(T_H_I_S);
          break;
        } else {
          if (i == this.ConversationID.length - 1) {
            console.log(" no conversation match, create new");
            this.OldChatId = "";
          }
        }
      }
    }
  }

  GetOldChat(Chat_i) {
    console.log("Old =>", Chat_i);
    this.OldChatId = Chat_i;
    firebase
      .database()
      .ref("Chats/" + Chat_i + "/chat")
      .on("value", (resp) => {
        this.UserChat = [];
        this.UserChat = snapshotToArray(resp);
        console.log("chat history", this.UserChat);
        setTimeout(() => {
          if (this.offStatus === false) {
            this.content.scrollToBottom(300);
          }
        }, 1000);
      });
  }

  send() {
    if (this.OldChatId) {
      this.ChatsID = "";
      this.ChatData();
    } else {
      var MyUserID = this.UserId;
      var NewUesrID = this.serviceProviderId;
      this.ConversID = MyUserID + "_" + NewUesrID;
      console.log("3 =>", this.ConversID);

      firebase
        .database()
        .ref("Conversation/" + this.ConversID)
        .set({
          ConverID: this.ConversID,
          UserChatID: this.UserId,
          UserChatName: this.userName,
          ProviderID: this.serviceProviderId,
          ProviderName: this.serviceProviderName,
          ServicesDate: Date(),
          type: this.conversationType,
        });
      this.ChatsID = "";
      this.ChatData();
    }
    if (this.chatType == 1) {
      this.viewCtrl.dismiss(true);
    }
  }

  ChatData() {
    if (this.Chat_Data.message == "" || this.Chat_Data.message == " ") {
    } else {
      if (this.OldChatId) {
        this.ChatsID = this.OldChatId;
        console.log("Old =>", this.ChatsID);
      } else if (this.ConversID) {
        this.ChatsID = this.ConversID;
        console.log("3 =>", this.ChatsID);
      }
      console.log(this.ChatsID);
      let newData = firebase
        .database()
        .ref("Chats/" + this.ChatsID + "/chat")
        .push();
      newData.set({
        user: this.Chat_Data.nickname,
        message: this.Chat_Data.message,
        type: "text",
        sendDate: Date(),
      });
      this.Chat_Data.message = "";
      this.Button_show = "0";
    }
  }

  AttechMent() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Choose image from',
      buttons: [
        {
          text: "Camera",
          icon: "camera",
          role: "destructive",
          handler: () => {
            console.log("Camera clicked");
            this.launchCamera("camera");
          },
        },
        {
          text: "Gallery",
          icon: "grid",
          handler: () => {
            this.launchCamera("gallery");
            console.log("Gallery clicked");
          },
        },
        {
          text: "Video",
          icon: "videocam",
          handler: () => {
            this.VideoUplod();
            console.log("Video clicked");
          },
        },
      ],
    });
    actionSheet.present();
  }

  launchCamera(source) {
    const options: CameraOptions = {
      quality: 80,
      sourceType:
        source === "camera"
          ? this.camera.PictureSourceType.CAMERA
          : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 800,
      correctOrientation: true,
      allowEdit: true,
    };
    this.camera.getPicture(options).then(
      (ImageData) => {
        this.MyImage = "data:image/jpeg;base64," + ImageData;
        this.uploadImg();
        console.log("success");
      },
      (err) => {
        console.log(err);
        console.log("error");
      }
    );
  }

  uploadImg() {
    this.alert.showLoader("");
    var random = Math.floor(Math.random() * 100);
    let options: FileUploadOptions = {
      fileKey: "image",
      fileName: "image_" + random + ".png",
      chunkedMode: false,
      mimeType: "image/png",
    };
    console.log(options);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer
      .upload(
        this.MyImage,
        "http://tradesglobeinc.com/api/imageupload.php",
        options
      )
      .then(
        (data) => {
          console.log(data);
          var imgdata = JSON.parse(data.response);
          console.log(imgdata);
          this.alert.dissmissLoader();
          if (imgdata.ResponseCode == 1) {
            this.mynewurl = imgdata.image_url;
            this.FirebaseAttach(this.mynewurl);
          } else {
          }
        },
        (err) => {
          console.log(err);
          this.alert.dissmissLoader();
        }
      );
  }

  FirebaseAttach(imageURI) {
    if (this.OldChatId) {
      this.ChatsID = this.OldChatId;
      console.log("Old =>", this.ChatsID);
    } else if (this.ConversID) {
      this.ChatsID = this.ConversID;
      console.log("3 =>", this.ChatsID);
    }
    let newData = firebase
      .database()
      .ref("Chats/" + this.ChatsID + "/chat")
      .push();
    newData.set({
      user: this.Chat_Data.nickname,
      message: imageURI,
      type: "image",
      sendDate: Date(),
    });
    this.Chat_Data.message = "";
    this.Button_show = "0";
  }

  VideoUplod() {
    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        var nativepath = result;
        var fileExtension = nativepath.substr(nativepath.lastIndexOf(".") + 1);
        console.log(nativepath);
        console.log(fileExtension);
        this.UploadVdo(nativepath);
      });
    });
  }

  UploadVdo(nativepath) {
    this.alert.showLoader("");
    var random = Math.floor(Math.random() * 100);
    let options: FileUploadOptions = {
      fileKey: "image",
      fileName: "Vedio_" + random + ".mp4",
      chunkedMode: false,
      mimeType: "video/mp4",
    };
    console.log(options);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer
      .upload(
        nativepath,
        "http://tradesglobeinc.com/api/imageupload.php",
        options
      )
      .then(
        (data) => {
          console.log(data);
          var imgdata = JSON.parse(data.response);
          console.log(imgdata);
          this.alert.dissmissLoader();
          if (imgdata.ResponseCode == 1) {
            this.mynewurl = imgdata.image_url;
            this.AttachVideo(this.mynewurl);
          } else {
          }
        },
        (err) => {
          console.log(err);
          this.alert.dissmissLoader();
        }
      );
  }

  AttachVideo(VedioURI) {
    if (this.OldChatId) {
      this.ChatsID = this.OldChatId;
      console.log("Old =>", this.ChatsID);
    } else if (this.ConversID) {
      this.ChatsID = this.ConversID;
      console.log("3 =>", this.ChatsID);
    }
    let newData = firebase
      .database()
      .ref("Chats/" + this.ChatsID + "/chat")
      .push();
    newData.set({
      user: this.Chat_Data.nickname,
      message: VedioURI,
      type: "video",
      sendDate: Date(),
    });
    this.Chat_Data.message = "";
    this.Button_show = "0";
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  Close() {
    this.navCtrl.pop();
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

export const snapshotToArray = (snapshot) => {
  let returnArr = [];
  snapshot.forEach((childSnapshot) => {
    let item = childSnapshot.val();
    console.log(item);
    returnArr.push(item);
  });
  return returnArr;
};

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "../config/config";
import "rxjs/add/operator/map";
import { ServiceProvider } from "./service";

@Injectable()
export class userService {
  user: any;
  url: string;
  newurl: string;
  userId: string;
  public userDetail: any;

  constructor(
    public http: HttpClient,
    private config: ConfigProvider,
    public service: ServiceProvider
  ) {
    this.url = this.config.url;
    this.userId = this.config.loginId;
  }

  public loadUserDetails() {
    var params = {
      user_id: this.config.loginId,
    };
    this.service.getUserDetails(params).then((result: any) => {
      if (result.data[0]) {
        this.userDetail = result.data[0];
      }

      console.log(this.userDetail);
    });
  }

  public getUserDetails() {
    return this.userDetail;
  }
}

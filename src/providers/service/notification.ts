import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "../config/config";
import "rxjs/add/operator/map";
import { ServiceProvider } from "./service";

@Injectable()
export class notificationService {
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

  updateJobStatus(jobId, status, time) {
    var params2 = {
      id: jobId,
      status: status,
      last_update: time,
    };
    this.service.updateJobStatus(params2).then((result) => {
      console.log("update job status ", result);
    });
  }
}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestJobPage } from './request-job';

@NgModule({
  declarations: [
    RequestJobPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestJobPage),
  ],
})
export class RequestJobPageModule {}

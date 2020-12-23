import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestModelPage } from './request-model';

@NgModule({
  declarations: [
    RequestModelPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestModelPage),
  ],
})
export class RequestModelPageModule {}

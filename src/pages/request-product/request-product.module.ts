import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestProductPage } from './request-product';

@NgModule({
  declarations: [
    RequestProductPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestProductPage),
  ],
})
export class RequestProductPageModule {}

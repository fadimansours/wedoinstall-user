import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountOffersPage } from './discount-offers';

@NgModule({
  declarations: [
    DiscountOffersPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountOffersPage),
  ],
})
export class DiscountOffersPageModule {}

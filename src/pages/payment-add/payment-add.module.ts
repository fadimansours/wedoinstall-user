import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentAddPage } from './payment-add';

@NgModule({
  declarations: [
    PaymentAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentAddPage),
  ],
})
export class PaymentAddPageModule {}

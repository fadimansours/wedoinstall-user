import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninModalPage } from './signin-modal';

@NgModule({
  declarations: [
    SigninModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninModalPage),
  ],
})
export class SigninModalPageModule {}

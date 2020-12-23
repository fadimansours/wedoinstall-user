import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalanderPage } from './calander';

@NgModule({
  declarations: [
    CalanderPage,
  ],
  imports: [
    IonicPageModule.forChild(CalanderPage),
  ],
})
export class CalanderPageModule {}

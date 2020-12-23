import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RescueStreakPage } from './rescue-streak';

@NgModule({
  declarations: [
    RescueStreakPage,
  ],
  imports: [
    IonicPageModule.forChild(RescueStreakPage),
  ],
})
export class RescueStreakPageModule {}

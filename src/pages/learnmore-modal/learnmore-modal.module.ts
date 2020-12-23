import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearnmoreModalPage } from './learnmore-modal';

@NgModule({
  declarations: [
    LearnmoreModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LearnmoreModalPage),
  ],
})
export class LearnmoreModalPageModule {}

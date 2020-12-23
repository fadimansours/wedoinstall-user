import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptDetailPage } from './accept-detail';

@NgModule({
  declarations: [
    AcceptDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptDetailPage),
  ],
})
export class AcceptDetailPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularViewPage } from './popular-view';

@NgModule({
  declarations: [
    PopularViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularViewPage),
  ],
})
export class PopularViewPageModule {}

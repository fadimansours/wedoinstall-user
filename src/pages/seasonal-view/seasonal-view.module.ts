import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeasonalViewPage } from './seasonal-view';

@NgModule({
  declarations: [
    SeasonalViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SeasonalViewPage),
  ],
})
export class SeasonalViewPageModule {}

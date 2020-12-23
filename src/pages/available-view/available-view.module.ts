import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableViewPage } from './available-view';

@NgModule({
  declarations: [
    AvailableViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableViewPage),
  ],
})
export class AvailableViewPageModule {}

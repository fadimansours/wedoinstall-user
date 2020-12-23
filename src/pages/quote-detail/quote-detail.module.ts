import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuoteDetailPage } from './quote-detail';

@NgModule({
  declarations: [
    QuoteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuoteDetailPage),
  ],
})
export class QuoteDetailPageModule {}

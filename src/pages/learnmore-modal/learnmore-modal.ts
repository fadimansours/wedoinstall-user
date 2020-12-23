import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-learnmore-modal',
  templateUrl: 'learnmore-modal.html',
})
export class LearnmoreModalPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('Learnmore-Modal Page');
  }

  CloseBtn() {
    this.viewCtrl.dismiss()
  }

  SlideNext(){
    this.slides.slideNext();
  }

  SlidePrev() {
    this.slides.slidePrev();
  }

}

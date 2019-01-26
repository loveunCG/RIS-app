import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudyOnlinePage } from '../../pages/study/study-online/study-online';
import { StudyDiscussPage } from '../../pages/study/study-discuss/study-discuss';
import { StudyDataShareContentPage } from '../../pages/study/study-data-share-content/study-data-share-content';
/**
 * Generated class for the StudyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-study',
  templateUrl: 'study.html',
})
export class StudyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyPage');
  }
  goBack():void{
    this.navCtrl.pop();
  }
  onClickOnline():void{
    this.navCtrl.push(StudyOnlinePage);
  }
  onClickDiscuss():void{
    this.navCtrl.push(StudyDiscussPage);
  }
  onClickDataShare():void{
    this.navCtrl.push(StudyDataShareContentPage);
  }
}


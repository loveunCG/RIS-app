import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportListPage } from '../../pages/report/report-list/report-list';
import { ReportMinePage } from '../../pages/report/report-mine/report-mine';
import { ReportReviewPage } from '../../pages/report/report-review/report-review';
import { ReportProvider } from '../../providers/report/report';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../base-page/base-page';
import { BaseProvider } from '../../providers/base/base';
/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage extends BasePage{
  constructor( public navCtrl: NavController, public navParams: NavParams,public reportService:ReportProvider, public toast: ToastController ) {
    super(toast);
      let usr_docotr = this.reportService.getSecretData().usr_is_doctor;
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }
  goBack():void{
    this.navCtrl.pop();
  }
  onClickMine():void{
    this.navCtrl.push(ReportMinePage);
  }
  onClickList():void{
    this.navCtrl.push(ReportListPage);    
  }
  onClickReview():void{
    this.navCtrl.push(ReportReviewPage);
  }
}

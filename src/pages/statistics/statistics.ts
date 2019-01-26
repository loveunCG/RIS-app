import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticsPatientPage } from '../../pages/statistics/statistics-patient/statistics-patient';
import { StatisticsRemotePage } from '../../pages/statistics/statistics-remote/statistics-remote';
import { StatisticsReportPage } from '../../pages/statistics/statistics-report/statistics-report';
/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }
  goBack():void{
    this.navCtrl.pop();
  }
  onClickPatient():void{
    this.navCtrl.push(StatisticsPatientPage);
  }

  onClickReport(){
    this.navCtrl.push(StatisticsReportPage);
  }

  onClickRemote(){
    this.navCtrl.push(StatisticsRemotePage);
  }
}

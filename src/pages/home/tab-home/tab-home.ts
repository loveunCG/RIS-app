import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import {BaseProvider} from '../../../providers/base/base';
import { ReportPage } from '../../../pages/report/report';
import { RemotePage } from '../../../pages/remote/remote';
import { StudyPage } from '../../../pages/study/study';
import { StatisticsPage } from '../../../pages/statistics/statistics';
import { LoginPage } from '../../login/login';

/**
 * Generated class for the TabHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {
  permission_val:any;
  usr_is_doctor:any;
  usr_role:any;
  report_flag:boolean=false;
  remote_flag:boolean=false;
  data_share_flag:boolean=false;
  char_flag:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public dataSevice:BaseProvider) {
    this.usr_is_doctor = this.dataSevice.getSecretData().usr_is_doctor;
    this.usr_role = this.dataSevice.getSecretData().usr_role;

    if(this.usr_is_doctor&&this.usr_role==1)
    {
      this.permission_val = this.dataSevice.getSecretDataValue();
      if(this.permission_val.MakeReport||this.permission_val.MyReport||this.permission_val.AuditReport||this.permission_val.DicomView||this.permission_val.MyAdvice){
        this.report_flag=true;
      }
      if(this.permission_val.RemoteConsultation||this.permission_val.RemoteConsultationReview||this.permission_val.RemoteDiagnosis
        ||this.permission_val.RemoteOutpatient||this.permission_val.Audit){
        this.remote_flag=true;
      }
      if(this.permission_val.ExchangeDiscussionArea||this.permission_val.DataSharing||this.permission_val.OnlineVideTeaching){
        this.data_share_flag=true;
      }
      this.char_flag=true;
    }else if(this.usr_is_doctor&&this.usr_role!=1){
      this.report_flag=true;
      this.remote_flag=true;
      this.data_share_flag=true;
      this.char_flag=true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }
  onReport():void{
    this.appCtrl.getRootNav().push(ReportPage);
  }
  onRemote():void{
    this.appCtrl.getRootNav().push(RemotePage);
  }
  onStudy():void{
    this.appCtrl.getRootNav().push(StudyPage);
  }
  onStatistics():void{
    this.appCtrl.getRootNav().push(StatisticsPage);
  }
  logout(){
    this.appCtrl.getRootNav().push(LoginPage);
  }
}

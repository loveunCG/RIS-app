import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { ReportProvider } from '../../../providers/report/report';
import { BasePage } from '../../base-page/base-page';

import { ReportUserDetailImagePage } from '../../../pages/report/report-user-detail-image/report-user-detail-image';
import { ReportUserDetailIntelliPage } from '../../../pages/report/report-user-detail-intelli/report-user-detail-intelli';
import { ReportUserDetailRemotePage } from '../../../pages/report/report-user-detail-remote/report-user-detail-remote';
import { ReportUserDetailReportPage } from '../../../pages/report/report-user-detail-report/report-user-detail-report';
import { ReportUserDetailImageListPage } from '../../../pages/report/report-user-detail-image-list/report-user-detail-image-list';
/**
 * Generated class for the ReportUserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-user-detail',
  templateUrl: 'report-user-detail.html',
})
export class ReportUserDetailPage extends BasePage {
  aryStatus:any = ['', '已登记', '已检查', '未审核', '审核通过', '未通过', '检查中', '草稿'];

  booking_id:string;
  booking_data:any = {};
  history_data:any = [];
  doctor_data:any = {};
  usr_DicomView:string;
  usr_MakeReport:string;
  usr_IntelligentDiagnosis:string;
  usr_RemoteDiagnosis:string;
  usr_role:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast:ToastController) {
    super(toast);
    this.booking_id = this.navParams.data.booking_id;
    this.reportService.getBookingInfo(this.booking_id).subscribe(data => {
      this.booking_data = data['cur_data'];
      this.history_data = data['history'];
      let doctor_data = this.reportService.getSecretDataValue();
      this.usr_DicomView = doctor_data.DicomView;
      this.usr_MakeReport = doctor_data.MakeReport;
      this.usr_IntelligentDiagnosis = doctor_data.IntelligentDiagnosis;
      this.usr_RemoteDiagnosis = doctor_data.RemoteDiagnosis;
      this.usr_role = this.reportService.getSecretData().usr_is_doctor;
      console.log('this is booking_data', this.booking_data, this.booking_data.hostipal_name);
    }, err => {
      this.presentToast("服务器连接失败!");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportUserDetailPage');
  }
  onViewImage():void{
    if(!this.booking_data.pb_booking_id) return;

    this.navCtrl.push(ReportUserDetailImageListPage, {image_num:this.booking_data['image_num'], hospital_name:this.booking_data.hostipal_name});
  }
  onReport():void{
    if(this.booking_data.pb_booking_id){
      if(this.booking_data.booking_status == 2){
        this.reportService.getReportInfo(this.booking_id).subscribe(data=>{
          this.navCtrl.push(ReportUserDetailReportPage,{data:data});
        });

      }
    }

  }
  onIntelligence():void{
    if(!this.booking_data.pb_booking_id) return;
    this.navCtrl.push(ReportUserDetailIntelliPage, {booking_id:this.booking_id});
  }
  onRemote():void{
    if(!this.booking_data.pb_booking_id) return;
    this.navCtrl.push(ReportUserDetailRemotePage, {booking_id:this.booking_id, remote_status:this.booking_data.remote_status,image_num:this.booking_data.image_num,
                        booking_status:this.booking_data.booking_status});
  }

}

import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../../base-page/base-page';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { ReportProvider } from '../../../providers/report/report';
import { ReportMineDetailPage } from '../../../pages/report/report-mine-detail/report-mine-detail';
/**
 * Generated class for the ReportMinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-mine',
  templateUrl: 'report-mine.html',
})
export class ReportMinePage extends BasePage{
  @ViewChild('submitDuration') submitDuration:FromToDateComponent;
  @ViewChild('examDuration') examDuration:FromToDateComponent;
  mine_report_list:any = [];
  inpFilter:string;
  status:string = '';
  aryStatus:any = ['', '已登记', '未提交', '未审核', '审核通过', '未通过', '检查中', '草稿'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast: ToastController ) {
    super(toast);
    this.reportService.getMyReportList().subscribe(data=>{
      this.reportService.myreport_list = data;
      this.statusFilter(2);      
      },
      err => {
        this.presentToast("服务器连接失败!");
      });
  }

  ionViewDidLoad() {
  }
  statusFilter(status) {
    var index = 0;
    for(var i=0;i<this.reportService.myreport_list.length;i++){
      if(this.reportService.myreport_list.booking_status <status)
        continue;
      this.mine_report_list[index] = this.reportService.myreport_list[i];
      index++;
    }
  }
  onInput(e):void{
    this.onFilter();
  }
  onCancel(e):void{
    this.onFilter();
  }
  onFilter():void{
    //console.log("search",this.inpFilter);
    if(!this.inpFilter){
      return;
    }
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.myreport_list.length ; i++){
      var user = this.reportService.myreport_list[i];
      var nm = user['patient_name'] as string;
      if(nm){
        let ddd:number = nm.indexOf(this.inpFilter);
        if(ddd >= 0) lastData.push(user);
      }
    }
    this.mine_report_list = lastData;
  }
  onUnWriteReport():void{
    this.status = "2";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.myreport_list.length ; i++){
      var user = this.reportService.myreport_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.mine_report_list = lastData;
  }
  onUnExamed():void{
    this.status = "3";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.myreport_list.length ; i++){
      var user = this.reportService.myreport_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.mine_report_list = lastData;
  }
  onExamed():void{
    this.status = "4";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.myreport_list.length ; i++){
      var user = this.reportService.myreport_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.mine_report_list = lastData;
  }
  onUnPassed():void{
    this.status = "5";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.myreport_list.length ; i++){
      var user = this.reportService.myreport_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.mine_report_list = lastData;
  }
  onDraft():void{
    this.status = "7";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.myreport_list.length ; i++){
      var user = this.reportService.myreport_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.mine_report_list = lastData;
  }
  onSearch():void{
    this.reportService.getMyReportList(this.submitDuration.from,this.submitDuration.to,this.examDuration.from,this.examDuration.to).subscribe(data=>{
      this.reportService.report_review_list = data;
      this.mine_report_list = data;
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }
  onClickUser(booking_id):void{
    if(!booking_id) return;
    console.log("booking_id:",booking_id);
    this.reportService.getMyReportDetail(booking_id).subscribe(data=>{
      this.reportService.myreport_detail = data;
      console.log(data);
      this.navCtrl.push(ReportMineDetailPage);
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }

  ionViewWillEnter(){
    this.reportService.getMyReportList().subscribe(data=>{
      this.reportService.myreport_list = data;
      this.statusFilter(2);      
      },
      err => {
        this.presentToast("服务器连接失败!");
      });
  }

}

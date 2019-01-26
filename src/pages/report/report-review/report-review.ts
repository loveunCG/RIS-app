import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../../providers/report/report';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../../base-page/base-page';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { ReportUserReviewDetailPage } from '../../../pages/report/report-user-review-detail/report-user-review-detail';
/**
 * Generated class for the ReportReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-review',
  templateUrl: 'report-review.html',
})
export class ReportReviewPage extends BasePage{
  @ViewChild('submitDuration') submitDuration:FromToDateComponent;
  @ViewChild('examDuration') examDuration:FromToDateComponent;
  aryStatus:any = ['', '已登记', '未提交', '未审核', '审核通过', '未通过', '检查中', '草稿'];
  report_list:any = [];
  status:string = '';
  inpFilter:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast: ToastController ) {
    super(toast);
    this.reportService.getReportReviewList().subscribe((data) =>{
      this.reportService.report_review_list = data;
      this.report_list = this.statusFilter(this.reportService.report_review_list);
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }
  ionViewDidLoad() {
  }
  statusFilter(list){
    var data:any =[];
    for(var i=0;i<list.length;i++){
      console.log("booking_status:",list.booking_status);
      if(list[i].booking_status == 3 || list[i].booking_status == 4 || list[i].booking_status == 5){
        data.push(list[i]);
      }
      else{
        continue;
      }  
    }
    return data;
  }
  onFilterSubmit():void{
    this.status = "3";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.report_review_list.length ; i++){
      var user = this.reportService.report_review_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.report_list = this.statusFilter(lastData);
  }
  onFilterPassed():void{
    this.status = "4";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.report_review_list.length ; i++){
      var user = this.reportService.report_review_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.report_list = this.statusFilter(lastData);
  }
  onFilterNoPassed():void{
    this.status = "5";
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.report_review_list.length ; i++){
      var user = this.reportService.report_review_list[i];
      if(user['booking_status'] == this.status){
        lastData.push(user);
      }
    }
    this.report_list = this.statusFilter(lastData);
  }

  onSearch():void{
    this.reportService.getReportReviewList(this.submitDuration.from,this.submitDuration.to,this.examDuration.from,this.examDuration.to).subscribe(data=>{
      this.reportService.report_review_list = data;
      this.report_list = this.statusFilter(data);
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }
  onFilter():void{
    //console.log("search",this.inpFilter);
    if(!this.inpFilter){
      return;
    }
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.reportService.report_review_list.length ; i++){
      var user = this.reportService.report_review_list[i];
      var nm = user['patient_name'] as string;
      if(nm){
        let ddd:number = nm.indexOf(this.inpFilter); 
        if(ddd >= 0) lastData.push(user);
      }
    }
    this.report_list = lastData;
  }
  onInput(e):void{
    this.onFilter();
  }
  onCancel(e):void{
    this.onFilter();
  }
  onClickUser(report_id):void{
    if(!report_id) return;
    console.log("report_id:",report_id);
    this.reportService.getReportReviewDetail(report_id).subscribe(data=>{
      this.reportService.report_user_review_detail = data;
      console.log(data);
      this.navCtrl.push(ReportUserReviewDetailPage);
    },
    err => {
      this.presentToast("服务器连接失败!");
    });    
  }

  ionViewWillEnter(){
    this.reportService.getReportReviewList().subscribe((data) =>{
      this.reportService.report_review_list = data;
      this.report_list = this.statusFilter(this.reportService.report_review_list);
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }
}

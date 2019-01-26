import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../../providers/report/report';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../../base-page/base-page';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReportReviewPage } from '../../../pages/report/report-review/report-review';

/**
 * Generated class for the ReportUserReviewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-user-review-detail',
  templateUrl: 'report-user-review-detail.html',
})
export class ReportUserReviewDetailPage extends BasePage{
  report_detail:any = {};
  // private reportSubmit:FormGroup;
  performance:string = "";
  recommand:string = "";
  impression:string = "";
  positivestatus:string = "";
  urgencystatus:string = "";
  imagedegree:string = "";
  content:string = "";
  //---------------------------------
  showButton = true;
  //----------------------------------
  editable:boolean = true;
  content_hidden = true;
  content_editable = true;
  reviewSubmit:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast: ToastController) {
    super(toast);
    if(!this.reportService.report_user_review_detail.Imaging_performance){
    }
    else{
      this.performance = this.reportService.report_user_review_detail.Imaging_performance;
    }
    if(!this.reportService.report_user_review_detail.recommend_report){
    }
    else{
      this.recommand = this.reportService.report_user_review_detail.recommend_report;
    }
    if(!this.reportService.report_user_review_detail.impression){
    }
    else{
      this.impression = this.reportService.report_user_review_detail.impression;
    }
    if(!this.reportService.report_user_review_detail.deliberation_content){
    }
    else{
      this.content = this.reportService.report_user_review_detail.deliberation_content;
    }
    if(!this.reportService.report_user_review_detail.positive_status){
    }
    else{
      this.positivestatus = this.reportService.report_user_review_detail.positive_status;
    }
    if(this.reportService.report_user_review_detail.urgency_status == null){
    }
    else{
      this.urgencystatus = this.reportService.report_user_review_detail.urgency_status;
    }
    if(!this.reportService.report_user_review_detail.image_degree){
    }
    else{
      this.imagedegree = this.reportService.report_user_review_detail.image_degree;
    }
    //  this.reviewSubmit = this.formBuilder.group({
    //   imagePerformance:[this.performance,Validators.required],
    //   imageRecommand:[this.recommand,Validators.required],
    //   imageImpression:[this.impression,Validators.required],
    //   imageContent:[this.content,Validators.required],
    //  });
  }

  ionViewDidLoad() {
    this.report_detail = this.reportService.report_user_review_detail;
    if(this.report_detail.patient_gender == "0"){
      this.report_detail.patient_gender = "女";
    }
    else{
      this.report_detail.patient_gender = "男";
    }
    switch(this.reportService.report_user_review_detail.booking_status){
      case "3":{//已提交
        this.showButton = true;
        this.content_editable = true;
        break;
      }
      case "4":{//已审核
        this.showButton = false;
        this.content_editable = false;
        break;
      }
      case "5":{//回退审核
        this.showButton = false;
        this.content_editable = false;
        break;
      }
    }
    this.report_detail.checked_time = this.getDate(this.report_detail.checked_time);
    this.report_detail.check_list = this.getCheckList();
    console.log('ionViewDidLoad ReportUserReviewDetailPage');
  }
  getDate(date:string){
    if(!date) return '';
    date = date.replace("T",":");
    date = date.substr(0,19);
    console.log(date);
    return date;
  }
  getCheckList(){
    var checklist:string = '';
    if(!this.report_detail.check_list) return '';
    if(this.report_detail.check_list.length > 0)
    {
      for(var i = 0;i < this.report_detail.check_list.length-1;i++){
        if(!this.report_detail.check_list[i]['checkup_item'])
          continue;
        checklist += this.report_detail.check_list[i]['checkup_item']+',';
      }
      checklist += this.report_detail.check_list[this.report_detail.check_list.length-1]['checkup_item'];
      return checklist;
    }
    else return '';
  }

  onPass(status:string):any{
    this.reportService.sendReportReviewInfo(this.report_detail.pb_report_id,
      this.report_detail.pb_booking_id,status).subscribe(data=>{
      console.log(data);
      this.navCtrl.pop();
     });
  }
  onUnPass(status:string):any{
    this.reportService.sendReportReviewInfo(this.report_detail.pb_report_id,
      this.report_detail.pb_booking_id,status).subscribe(data=>{
      console.log(data);
      this.navCtrl.pop();
    });
  }


}

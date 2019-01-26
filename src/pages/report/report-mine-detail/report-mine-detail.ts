import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../../providers/report/report';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../../base-page/base-page';
import {Validators, FormBuilder } from '@angular/forms';
import { ReportReviewPage } from '../report-review/report-review';
import { ReportMinePage } from '../../../pages/report/report-mine/report-mine';
/**
 * Generated class for the ReportMineDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-mine-detail',
  templateUrl: 'report-mine-detail.html',
})
export class ReportMineDetailPage extends BasePage{
  myreport_detail:any = {};
  patient_detail:any = {};
  patient_history:any = [];
  reportSubmit:any;
  performance:string = "";
  recommand:string = "";
  impression:string = "";
  positivestatus:string = "";
  urgencystatus:string = "";
  imagedegree:string = "";
  content:string = "";
  //---------------------------------
  showSaveButton:boolean = true;
  showSubmitButton:boolean = true;
  showReSubmitButton:boolean = false;
  //----------------------------------
  editable:boolean = true;
  content_hidden = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast: ToastController,private formBuilder: FormBuilder) {
    super(toast);
    if(!this.reportService.myreport_detail.cur_data.Imaging_performance){
    }
    else{
      this.performance = this.reportService.myreport_detail.cur_data.Imaging_performance;
    }
    if(!this.reportService.myreport_detail.cur_data.recommend_report){
    }
    else{
      this.recommand = this.reportService.myreport_detail.cur_data.recommend_report;
    }
    if(!this.reportService.myreport_detail.cur_data.impression){
    }
    else{
      this.impression = this.reportService.myreport_detail.cur_data.impression;
    }
    if(!this.reportService.myreport_detail.cur_data.deliberation_content){
    }
    else{
      this.content = this.reportService.myreport_detail.cur_data.deliberation_content;
    }
    if(!this.reportService.myreport_detail.cur_data.positive_status){
    }
    else{
      this.positivestatus = this.reportService.myreport_detail.cur_data.positive_status;
    }
    if(this.reportService.myreport_detail.cur_data.urgency_status == null){
    }
    else{
      this.urgencystatus = this.reportService.myreport_detail.cur_data.urgency_status;
    }
    if(!this.reportService.myreport_detail.cur_data.image_degree){
    }
    else{
      this.imagedegree = this.reportService.myreport_detail.cur_data.image_degree;
    }
    this.reportSubmit = this.formBuilder.group({
      imagePerformance:[this.performance,Validators.required],
      imageRecommand:[this.recommand,Validators.required],
      imageImpression:[this.impression,Validators.required],
      imageContent:[this.content,Validators.required],
      positive_status:[this.positivestatus,Validators.required],
      urgency_status:[this.urgencystatus,Validators.required],
      image_degree:[this.imagedegree,Validators.required]
     });
  }

  ionViewDidLoad() {
    console.log("urgencystatus",this.urgencystatus);
    console.log("myreport_detail:",this.reportService.myreport_detail);
    console.log("myreport_detail:",this.reportService.myreport_detail.cur_data.booking_status);
    switch(this.reportService.myreport_detail.cur_data.booking_status){
      case "2"://未提交
      case "7":{//草稿
        break;
      }
      case "3":{//已提交
        this.showSaveButton= false;
        this.showSubmitButton = false;
        this.showReSubmitButton = false;
        this.editable = false;
        break;
      }
      case "4":{//已审核
        this.showSaveButton= false;
        this.showSubmitButton = false;
        this.showReSubmitButton = false;
        this.editable = false;
        this.content_hidden = false;
        break;
      }
      case "5":{//回退审核
        this.showReSubmitButton = true;
        this.showSubmitButton = false;
        this.content_hidden = false;
        break;
      }
      case "6":{//检查中
        break;
      }
    }
    this.myreport_detail = this.reportService.myreport_detail;
    if(this.myreport_detail.cur_data.patient_gender == "0"){
      this.myreport_detail.cur_data.patient_gender = "女";
    }
    else{
      this.myreport_detail.cur_data.patient_gender = "男";
    }
    this.patient_detail = this.myreport_detail.cur_data;
    this.patient_detail.checked_time = this.getDate(this.patient_detail.checked_time);
    this.patient_detail.check_list = this.getCheckList(this.patient_detail.check_list);
    this.patient_history = this.myreport_detail.history;
    var tmp = [];
    var index = 0;
    for(var i =0;i<this.patient_history.length;i++){
      if(!this.patient_history[i].checked_time || !this.patient_history[i].check_list){
        continue;
      }
      tmp[index] = {};
      tmp[index].checked_time = this.getDate(this.patient_history[i].checked_time);
      tmp[index].check_list = this.getCheckList(this.patient_history[i].check_list);
      index++;
    }
    this.patient_history = tmp;
  }
  getDate(date:string){
    if(!date) return '';
    date = date.replace("T",":");
    date = date.substr(0,19);
    console.log(date);
    return date;
  }
  getCheckList(list){
    var checklist:string = '';
    if(!list || list.length == 0) return '';
    for(var i = 0;i < list.length-1;i++){
      checklist += list[i]['checkup_item']+', ';
    }
    checklist += list[list.length-1]['checkup_item'];
    return checklist;
  }
  onSave():void{
    console.log(this.reportSubmit.value);
    var report = this.reportSubmit.value;
    this.reportService.sendReportInfo(this.myreport_detail.cur_data.pb_booking_id,this.myreport_detail.cur_data.pb_report_id,report.imagePerformance,report.imageRecommand,
      report.imageImpression,report.urgency_status,report.positive_status,report.image_degree,"1").subscribe((data)=>{
        console.log(data);
        this.navCtrl.pop();
      });
    
  }
  onSubmit():void{
    var report = this.reportSubmit.value;
    this.reportService.sendReportInfo(this.myreport_detail.cur_data.pb_booking_id,this.myreport_detail.cur_data.pb_report_id,report.imagePerformance,report.imageRecommand,
      report.imageImpression,report.urgency_status,report.positive_status,report.image_degree,null).subscribe((data)=>{
        console.log("sdfsdfdfsdfsd",data);
        this.navCtrl.pop();
      });   
  }
  onReSubmit():void{
    var report = this.reportSubmit.value;
    this.reportService.sendReportInfo(this.myreport_detail.cur_data.pb_booking_id,this.myreport_detail.cur_data.pb_report_id,report.imagePerformance,report.imageRecommand,
      report.imageImpression,report.urgency_status,report.positive_status,report.image_degree,null).subscribe((data)=>{
        console.log(data);
        this.navCtrl.pop();
      });
  }
}

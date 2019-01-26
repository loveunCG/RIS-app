import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import {Validators, FormBuilder} from '@angular/forms';
import { ReportProvider } from '../../../providers/report/report';
import { BasePage } from '../../base-page/base-page';
import { ReportUserDetailPage } from '../../../pages/report/report-user-detail/report-user-detail';
import { ReportListPage } from '../../../pages/report/report-list/report-list';
import { ReporTemplatePage } from '../../../pages/report/report-templet/report-templet';
/**
 * Generated class for the ReportUserDetailReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-user-detail-report',
  templateUrl: 'report-user-detail-report.html',
})
export class ReportUserDetailReportPage extends BasePage {

  report_id:string;
  report_detail:any = {};

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
  gender:any = ['男', '女'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast:ToastController,private formBuilder:FormBuilder) {
    super(toast);
    this.report_detail = this.navParams.data.data;
    this.report_detail.checked_time = this.getDate(this.report_detail.checked_time);
    this.report_detail.check_list = this.getCheckList(this.report_detail.check_list);

    if(!this.report_detail.Imaging_performance){
    }
    else{
      this.performance = this.report_detail.Imaging_performance;
    }
    if(!this.report_detail.recommend_report){
    }
    else{
      this.recommand = this.report_detail.recommend_report;
    }
    if(!this.report_detail.impression){
    }
    else{
      this.impression = this.report_detail.impression;
    }
    if(!this.report_detail.positive_status){
    }
    else{
      this.positivestatus = this.report_detail.positive_status;
    }
    if(this.report_detail.urgency_status == null){
    }
    else{
      this.urgencystatus = this.report_detail.urgency_status;
    }
    if(!this.report_detail.image_degree){
    }
    else{
      this.imagedegree = this.report_detail.image_degree;
    }

    this.reportSubmit = this.formBuilder.group({
      imagePerformance:[this.performance,Validators.required],
      imageRecommand:[this.recommand,Validators.required],
      imageImpression:[this.impression,Validators.required],
      positive_status:[this.positivestatus,Validators.required],
      urgency_status:[this.urgencystatus,Validators.required],
      image_degree:[this.imagedegree,Validators.required]
      });

  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    if(this.reportService.istemplate){
      this.reportSubmit = this.formBuilder.group({
        imagePerformance:[this.reportService.template_image,Validators.required],
        imageRecommand:[this.reportService.template_suggestion,Validators.required],
        imageImpression:[this.impression,Validators.required],
        positive_status:[this.positivestatus,Validators.required],
        urgency_status:[this.urgencystatus,Validators.required],
        image_degree:[this.imagedegree,Validators.required]
        });
    }
    this.reportService.istemplate = false
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
    this.navCtrl.remove(this.navCtrl.length()-1);
    console.log(this.reportSubmit.value);
    var report = this.reportSubmit.value;
    this.reportService.sendReportInfo(this.report_detail.pb_booking_id,this.report_detail.pb_report_id,report.imagePerformance,report.imageRecommand,
      report.imageImpression,report.urgency_status,report.positive_status,report.image_degree,"1").subscribe((data)=>{
        console.log(data);
        //this.navCtrl.push(ReportUserDetailPage,{booking_id:this.report_detail.pb_booking_id});
        this.navCtrl.pop();
      });
  }
  onSubmit():void{
    this.navCtrl.remove(this.navCtrl.length()-1);
    var report = this.reportSubmit.value;
    this.reportService.sendReportInfo(this.report_detail.pb_booking_id,this.report_detail.pb_report_id,report.imagePerformance,report.imageRecommand,
      report.imageImpression,report.urgency_status,report.positive_status,report.image_degree,null).subscribe((data)=>{
        console.log(data);
        this.navCtrl.pop();
        //this.navCtrl.push(ReportUserDetailPage,{booking_id:this.report_detail.pb_booking_id});
      });
  }

  template(){
    this.navCtrl.push(ReporTemplatePage);
  }
  
}

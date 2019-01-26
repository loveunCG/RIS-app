import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseProvider } from '../base/base';

/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider extends BaseProvider {
  report_review_list:any;
  report_user_review_detail:any;
  myreport_list:any;
  myreport_detail:any;
  template_image:string;
  template_suggestion:string;
  istemplate:Boolean=false;
  constructor(public http: HttpClient) {
    super(http);
    console.log('Hello ReportProvider Provider');
  }

  getReportList(src?:string, status?:string, start?:string, end?:string, type?:string):Observable<Object>{
    var param = {};
    if(src) param['patient_source']= src;
    if(status) param['booking_status']= status;
    if(start) param['start']= start;
    if(end) param['end']= end;
    if(type) param['device_type']= type;
    
    return this.sendRequest(this.Const.urlReportList, param);
  }

  getBookingInfo(booking_id:string):Observable<Object>{
    return this.sendRequest(this.Const.urlReportDetail, {booking_id:booking_id});
  }
  getReportInfo(booking_id:string):Observable<Object>{
    return this.sendRequest(this.Const.urlGetReportInfo, {booking_id:booking_id});
  }
  sendReportInfo(booking_id:string, report_id:string, performance:string, recommand:string,impression:string, urgency:string, positive:string, degree:string, save:string):Observable<Object>{
    var data = {};
    data['booking_id'] = booking_id;
    if(report_id != null){
      data['report_id'] = report_id;
    }
    data['Imaging_performance'] = performance;
    data['recommend_report'] = recommand;
    data['impression'] = impression;
    data['urgency_status'] = urgency;
    data['positive_status'] = positive;
    data['image_degree'] = degree;
    if(save != null){
      data['save'] = save;
    }
    console.log("sendReportInfo");
    return this.sendRequest(this.Const.urlSetReportInfo, data);
  }
  sendReportReviewInfo(report_id:string,
    booking_id:string,booking_stauts:string):Observable<Object>{
    var data = {};
    data['report_id'] = report_id;
    // data['deliberation_id'] = deliberation_id;
    // data['doctor_name'] = doctor_name;
    // data['deliberation_content'] = deliberation_content;
    data['booking_id'] = booking_id;
    data['booking_stauts'] = booking_stauts;
    return this.sendRequest(this.Const.urlSetReportReviewInfo, data);
  }

  getReportReviewList(submit_start?:string,submit_end?:string,exam_start?:string,exam_end?:string){
    var param = {};    
    if(submit_start){param['reportstarttime']= submit_start;}
    if(submit_end){param['reportendtime']= submit_end;}
    if(exam_start){param['delistarttime']= exam_start;}
    if(exam_end){param['deliendtime']= exam_end;}
    return this.sendRequest(this.Const.urlReportReviewList, param);
  }
  getReportReviewDetail(report_id){
    var param = {};
    if(report_id){param['report_id'] = report_id;}
    return this.sendRequest(this.Const.urlReportReviewDetail, param);
  }
  getMyReportList(submit_start?:string,submit_end?:string,exam_start?:string,exam_end?:string){
    var param = {};
    if(submit_start){param['reportstarttime']= submit_start;}
    if(submit_end){param['reportendtime']= submit_end;}
    if(exam_start){param['delistarttime']= exam_start;}
    if(exam_end){param['deliendtime']= exam_end;}
    return this.sendRequest(this.Const.urlMyReportList, param);
  }
  getMyReportDetail(booking_id){
    var param = {};
    if(booking_id){param['booking_id'] = booking_id;}
    return this.sendRequest(this.Const.urlMyReportDetail, param);
  }

  getDicomList(img_id:string){
    return this.sendRequest(this.Const.urlGetdicomList, {patient_id: img_id});
  }

  getTemplateDevice(param){
    return this.sendRequest(this.Const.urltemplateDevice, param);
  }

  getTemplateSubClass(param){
    return this.sendRequest(this.Const.urltemplateSubClass, param);
  }

  getTemplateContent(param){
    return this.sendRequest(this.Const.urltemplateContent, param);
  }


  getTemplateEdit(param){
    return this.sendRequest(this.Const.urltemplateContentEdit, param);
  }

  getTemplateRemove(param){
    return this.sendRequest(this.Const.urltemplateSubClassRemove, param);
  }

  getTemplatecontentRemove(param){
    return this.sendRequest(this.Const.urltemplateContentRemove, param);
  }

  getTemplatsubClassEdit(param){
    return this.sendRequest(this.Const.urltemplateSubClassEdit, param);
  }

}

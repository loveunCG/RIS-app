import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the BaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseProvider {
  public Const = {
    "urlServer":"http://120.55.63.29:5001",
    //"urlServer":"http://192.168.1.9:5001",
    "urlLogin":"/api/auth/login",
    "urlSendSMS":"/api/auth/sendSMS",
    "urlRegister":"/api/auth/register",
    "urlCheckDuplication":"/api/auth/checkduplication",
    "urlReportList":"/api/report/reportlist",
    "urlForgetPassword":"/api/auth/forget",
    "urlCheckAuth":"/api/report/checkauth",
    "urlReportDetail":"/api/report/reportdetail",
    "urlSetReportInfo":"/api/report/reporting",
    "urlGetReportInfo":"/api/report/reportingview",
    "urlGetdicomList":"/api/report/dicomimg_list",
    "urlRomoteView":"/api/remote/remoteView",
    "urlReportRomoteView":"/api/remote/reportremoteView",
    "urlsaveRemote":"/api/remote/saveRemote",
    "urlRomoteList":"/api/remote/remoteList",
    "urlgetpaitent":"/api/remote/getpaitent",
    "urlReportReviewList":"/api/report/deliberationlist",
    "urlReportReviewDetail":"/api/report/deliberationDetial",
    "urlSetReportReviewInfo":"/api/report/deliberation",
    "urlMyReportList":"/api/report/myreportlist",
    "urltemplateDevice":"/api/report/urltemplateDevice",
    "urltemplateSubClass":"/api/report/urltemplateSubClass",
    "urltemplateContent":"/api/report/urltemplateContent",
    "urltemplateSubClassRemove":"/api/report/urltemplateSubClassRemove",
    "urltemplateContentEdit" : "/api/report/urltemplateContentEdit",
    "urltemplateSubClassEdit":"/api/report/urltemplateSubClassEdit",
    "urltemplateContentRemove":"/api/report/urltemplateContentRemove",

    "urlMyReportDetail":"/api/report/reportdetail",
    "urlRomoteReviewList":"/api/remote/remoteReviewList",
    "urlRomoteReviewListSave":"/api/remote/urlRomoteReviewListSave",

    "urlStduyList":"/api/study/studyList",
    "urlStduyDataShareHospitalList":"/api/study/urlStduyDataShareHospitalList",
    "urlStduyDataShareList":"/api/study/urlStduyDataShareList",
    "urlStduyMakeDataShare":"/api/study/urlStduyMakeDataShare",
    "urlStduyRemoveDataShare":"/api/study/urlStduyRemoveDataShare",
    "urlStduyRenameDataShare":"/api/study/urlStduyRenameDataShare",
    "StduyDataShareListContent":"/api/study/StduyDataShareListContent",
    "urlStduyDiscussList":"/api/study/urlStduyDiscussList",
    "urlStduyDiscussPost":"/api/study/savePost",
    "urlStduyAddComment":"/api/study/saveComment",
    "urlDeletePost":"/api/study/urlDeletePost",
    "urlDeleteComment":"/api/study/urlDeleteComment",
    "urlSatisticsHospital":"/api/statistics/urlStatisticsHospital",
    "urlSatisticsChart":"/api/statistics/statisticsChart",
    "urlStatisticsPatient":"/api/statistics/urlStatisticsPatient",
    "urlStatisticsRemote":"/api/statistics/urlStatisticsRemote",
    "urlStatisticsReport":"/api/statistics/urlStatisticsReport",
 };

  private static tokenheaders: HttpHeaders;
  private static secretData;
  private static doctor_data:any = {};


  constructor(public http: HttpClient) {
    // setInterval(data=>{
    //   console.log("11222333", data)
    //   }, 5000);
  }

  setTokenHeader(param: string):void{
    BaseProvider.tokenheaders = new HttpHeaders().set("Authorization", "Bearer "+ param);
  }

  getTokenHeader():HttpHeaders{
    return BaseProvider.tokenheaders;
  }

  getSecretData():any{
    console.log("getSecretData", BaseProvider.secretData);
    return BaseProvider.secretData;
  }

  getSecretDataValue():any{

    if(!BaseProvider.secretData.usr_is_doctor)
    {
      BaseProvider.doctor_data['DicomView'] = false;
      BaseProvider.doctor_data['MakeReport'] = false;
      BaseProvider.doctor_data['IntelligentDiagnosis'] = false;
      BaseProvider.doctor_data['RemoteDiagnosis'] = false;
      BaseProvider.doctor_data['MyReport'] = false;
      BaseProvider.doctor_data['AuditReport'] = false;
      BaseProvider.doctor_data['Audit'] = false;
      BaseProvider.doctor_data['InitiateConsultation'] = false;
      BaseProvider.doctor_data['RemoteOutpatient'] = false;
      BaseProvider.doctor_data['RemoteConsultation'] = false;
      BaseProvider.doctor_data['MyAdvice'] = false;
      BaseProvider.doctor_data['ContactStart'] = false;
      BaseProvider.doctor_data['RemoteConsultationReview'] = false;
      BaseProvider.doctor_data['DeliContact'] = false;
      BaseProvider.doctor_data['OnlineVideoTeaching'] = false;
      BaseProvider.doctor_data['ExchangeDiscussionArea'] = false;
      BaseProvider.doctor_data['DataSharing'] = false;
    }
    else if(BaseProvider.secretData.usr_is_doctor && BaseProvider.secretData.usr_role != 1000)
    {
      BaseProvider.doctor_data['DicomView'] = true;
      BaseProvider.doctor_data['MakeReport'] = true;
      BaseProvider.doctor_data['IntelligentDiagnosis'] = true;
      BaseProvider.doctor_data['RemoteDiagnosis'] = true;
      BaseProvider.doctor_data['MyReport'] = true;
      BaseProvider.doctor_data['AuditReport'] = true;
      BaseProvider.doctor_data['Audit'] = true;
      BaseProvider.doctor_data['InitiateConsultation'] = true;
      BaseProvider.doctor_data['RemoteOutpatient'] = true;
      BaseProvider.doctor_data['RemoteConsultation'] = true;
      BaseProvider.doctor_data['MyAdvice'] = true;
      BaseProvider.doctor_data['ContactStart'] = true;
      BaseProvider.doctor_data['RemoteConsultationReview'] = true;
      BaseProvider.doctor_data['DeliContact'] = true;
      BaseProvider.doctor_data['OnlineVideoTeaching'] = true;
      BaseProvider.doctor_data['ExchangeDiscussionArea'] = true;
      BaseProvider.doctor_data['DataSharing'] = true;

    }
    else if(BaseProvider.secretData.usr_is_doctor && BaseProvider.secretData.usr_role == 1000)
    {
      BaseProvider.doctor_data['DicomView'] = false;
      BaseProvider.doctor_data['MakeReport'] = false;
      BaseProvider.doctor_data['IntelligentDiagnosis'] = false;
      BaseProvider.doctor_data['RemoteDiagnosis'] = false;
      BaseProvider.doctor_data['MyReport'] = false;
      BaseProvider.doctor_data['AuditReport'] = false;
      BaseProvider.doctor_data['Audit'] = false;
      BaseProvider.doctor_data['InitiateConsultation'] = false;
      BaseProvider.doctor_data['RemoteOutpatient'] = false;
      BaseProvider.doctor_data['RemoteConsultation'] = false;
      BaseProvider.doctor_data['MyAdvice'] = false;
      BaseProvider.doctor_data['ContactStart'] = false;
      BaseProvider.doctor_data['RemoteConsultationReview'] = false;
      BaseProvider.doctor_data['DeliContact'] = false;
      BaseProvider.doctor_data['OnlineVideoTeaching'] = false;
      BaseProvider.doctor_data['ExchangeDiscussionArea'] = false;
      BaseProvider.doctor_data['DataSharing'] = false;
  
      for (var i = 0; BaseProvider.secretData.doctor_role.lenth; i++ )
      {
        if (BaseProvider.secretData.doctor_role[i]=="DicomView")
          BaseProvider.doctor_data['DicomView'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="MakeReport")
          BaseProvider.doctor_data['MakeReport']= true;
        if (BaseProvider.secretData.doctor_role[i]=="IntelligentDiagnosis")
          BaseProvider.doctor_data['IntelligentDiagnosis'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="RemoteDiagnosis")
          BaseProvider.doctor_data['RemoteDiagnosis'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="MyReport")
          BaseProvider.doctor_data['MyReport']= true;
        if (BaseProvider.secretData.doctor_role[i]=="AuditReport")
          BaseProvider.doctor_data['AuditReport'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="Audit")
          BaseProvider.doctor_data['Audit'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="InitiateConsultation")
          BaseProvider.doctor_data['InitiateConsultation'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="RemoteOutpatient")
          BaseProvider.doctor_data['RemoteOutpatient'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="RemoteConsultation")
          BaseProvider.doctor_data['RemoteConsultation'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="MyAdvice")
          BaseProvider.doctor_data['MyAdvice'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="ContactStart")
          BaseProvider.doctor_data['ContactStart'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="RemoteConsultationReview")
          BaseProvider.doctor_data['RemoteConsultationReview'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="DeliContact")
          BaseProvider.doctor_data['DeliContact'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="OnlineVideoTeaching")
          BaseProvider.doctor_data['OnlineVideoTeaching'] = true;
        if (BaseProvider.secretData.doctor_role[i]=="ExchangeDiscussionArea")
          BaseProvider.doctor_data['ExchangeDiscussionArea'] = true;
        if (BaseProvider.secretData.doctor_role[i] == "DataSharing") 
          BaseProvider.doctor_data['DataSharing'] = true;
      }
    }
    console.log("BaseProvider.doctor_data", BaseProvider.doctor_data)
    return BaseProvider.doctor_data;
  }

  setSecretData(param:any):void{
    BaseProvider.secretData = param;
  }

  sendRequest(uri:string, data: any):Observable<Object>{
    console.log(uri,data);
    for(var key in data){
      var val = data[key];
      if(!val) delete data[key];
    }
    let param = {params:data};
    param['headers'] = this.getTokenHeader();
    console.log('this is token', param['headers'] )
    console.log('this', param)
    return this.http.get(this.Const.urlServer + uri, param);
  }
  sendRequestEx(uri:string, data: any):Observable<Object>{
    for(var key in data){
      var val = data[key];
      if(!val) delete data[key];
    }
    let param = {params:data};
    param['headers'] = this.getTokenHeader();
    // console.log('this is token', this.getTokenHeader())
    // console.log('this', param)
    return this.http.get(uri, param);
  }



}

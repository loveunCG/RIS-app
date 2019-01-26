import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseProvider} from '../base/base';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteProvider extends BaseProvider{
  remoteData: any;
  remoteDetail: any;
  isSave: boolean;
  isRemote:any;
  isDeliberation:boolean;
  remoteSubmit: any;
  remoteReviewSubmit: any;
  constructor(public http: HttpClient) {
    super(http);
    console.log('Hello RemoteProvider Provider');
  }

  remoteList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlRomoteList, query);
  }
  
  getremoteReviewList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlRomoteReviewList, query);
  }

  getRemoteView(remoteId){
    return this.sendRequest(this.Const.urlRomoteView, {contact_id: remoteId});
  }

  getReportRemoteView(img_num){
    return this.sendRequest(this.Const.urlRomoteView, {image_num: img_num});
  }

  getpatientInfo(query):Observable<any>{
    return this.sendRequest(this.Const.urlgetpaitent, query);
  }

}

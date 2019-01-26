import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseProvider} from '../base/base';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the StudyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudyProvider extends BaseProvider{
  onlineData: any;
  constructor(public http: HttpClient) {
    super(http);
    console.log('Hello StudyProvider Provider');
  }

  getStudyList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyList, query);
  }

  getHospitalShareList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyDataShareHospitalList, query);
  }
  
  getDataShareList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyDataShareList, query);
  }

  getMakeShareList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyMakeDataShare, query);
  }

  getRemoveShareList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyRemoveDataShare, query);
  }

  getRenameShareList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyRenameDataShare, query);
  }

  getDiscussList(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyDiscussList, query);
  }

  getaddDiscuss(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyDiscussPost, query);
  }

  getaddComment(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStduyAddComment, query);
  }

  getRemoveComment(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlDeleteComment, query);
  }
  
  getRemoveDiscuss(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlDeletePost, query);
  }

}

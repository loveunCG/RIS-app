import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseProvider} from '../base/base';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StatisticsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatisticsProvider extends BaseProvider{

  chartdata:any;
  constructor(public http: HttpClient) {
    super(http);
    console.log('Hello StatisticsProvider Provider');
  }

  getSatisticsChart(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlSatisticsChart, query);
  }

  getSatisticsPatientChart(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStatisticsPatient, query);
  }

  getSatisticsRemoteChart(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStatisticsRemote, query);
  }

  getSatisticsReportChart(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlStatisticsReport, query);
  }

  getSatisticshospital(query? :any):Observable<any>{
    return this.sendRequest(this.Const.urlSatisticsHospital, query);
  }

}

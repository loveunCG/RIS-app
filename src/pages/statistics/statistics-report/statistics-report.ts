import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BasePage } from '../../base-page/base-page';
import { StatisticsProvider } from '../../../providers/statistics/statistics';
import { query } from '@angular/core/src/animation/dsl';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the StatisticsMinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-statistics-report',
  templateUrl: 'statistics-report.html',
})
export class StatisticsReportPage {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: false
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartLabels:string[] = [];
  public barChartData:any[] = [
    {data: [], label: 'Series A'}
];

  // public barChartLabels:string[];
  // public barChartData:any[];

  datetype:any;          //0:day, 1:month, 2: year 
  myWorkType:any;          //0:patient, 1: report, 2:remote
  mydatePart:any;
  hospitalname:any;
  registertype:any;
  hospital_name:string;
  hospital:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public statisticsService:StatisticsProvider) {
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var month1;
    if(month<10) {
      month1 = "0" + month;
    }
    else{
      month1 = month;
    }
    this.mydatePart = year + "-" + month1;
    this.datetype = '0';
    this.myWorkType = '0';
    this.registertype = '0';
    var query = {
      'date_type':this.datetype, 
      'date_Part':this.mydatePart,
      'device_type':this.registertype,
      'chat_type':this.datetype
    };
     console.log('this is first',query)
    
    this.statisticsService.getSatisticsReportChart(query).subscribe((data)=>{
      this.statisticsService.chartdata = data;
      console.log("!!!!!!!!!!", data)
      for (var x in this.statisticsService.chartdata.date){
          this.barChartLabels[x] = this.statisticsService.chartdata.date[x];
      }

      let numbarChartLabels = this.barChartLabels.map(Number);
      for(var i = 0; i < numbarChartLabels.length; i++){
        numbarChartLabels[i]= numbarChartLabels[i] + 1;
      }
      let strChartLabels = numbarChartLabels.map(String);
      this.barChartLabels.length = 0;

      for (var y in strChartLabels){
        this.barChartLabels[y] = strChartLabels[y];
      }

      var realData = [];
      for (const key in data['data']) {
        realData[key] = data['data'][key];
      }
      this.barChartData = [
        {data: realData, label: 'Series A'}
      ];
    });
    
  

  }
  
  onClickChart(status: any):any{
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var month1;
    if(month<10) {
      month1 = "0" + month;
    }
    else{
      month1 = month;
    }
    if(status == 0){
      this.datetype = '0';
      this.mydatePart = year + "-" + month1;      
    }
    else if(status == 1){
      this.datetype = '1';
      this.mydatePart = year.toString();
    }
    else if(status == 2){
      this.datetype = '2';
    }
    var query = {
      'date_type':this.datetype, 
      'date_Part':this.mydatePart,
      'device_type':this.registertype,
      'chat_type':this.datetype
    };
    this.statisticsService.getSatisticsReportChart(query).subscribe((data)=>{
      this.statisticsService.chartdata = data;
      this.barChartLabels.length = 0;
      this.barChartData.length = 0;
      for (var x in this.statisticsService.chartdata.date){
          this.barChartLabels[x] = this.statisticsService.chartdata.date[x];
      }

      if(this.datetype == 0){      
        let numbarChartLabels = this.barChartLabels.map(Number);
        for(var i = 0; i < numbarChartLabels.length; i++){
          numbarChartLabels[i]= numbarChartLabels[i] + 1;
        }
        let strChartLabels = numbarChartLabels.map(String);
        this.barChartLabels.length = 0;

        for (var y in strChartLabels){
          this.barChartLabels[y] = strChartLabels[y];
        }
      }

      var realData = [];
      for (const key in data['data']) {
        realData[key] = data['data'][key];
      }
      this.barChartData = [
        {data: realData, label: 'Series A'}
      ];
    });
  }

  changedate(dateval: any):any{
    if(this.datetype == 0){
      this.mydatePart = dateval;
    }
    else if(this.datetype == 1){
      var datevalsplit = dateval.split('-');
      dateval = datevalsplit[0];
      this.mydatePart = dateval;
    }
    var query = {
      'date_type':this.datetype, 
      'date_Part':this.mydatePart,
      'device_type':this.registertype,
      'chat_type':this.datetype
    };
    this.statisticsService.getSatisticsReportChart(query).subscribe((data)=>{
      this.statisticsService.chartdata = data;
      this.barChartLabels.length = 0;
      this.barChartData.length = 0;
      for (var x in this.statisticsService.chartdata.date){
          this.barChartLabels[x] = this.statisticsService.chartdata.date[x];
      }

      if(this.datetype == 0){      
        let numbarChartLabels = this.barChartLabels.map(Number);
        for(var i = 0; i < numbarChartLabels.length; i++){
          numbarChartLabels[i]= numbarChartLabels[i] + 1;
        }
        let strChartLabels = numbarChartLabels.map(String);
        this.barChartLabels.length = 0;

        for (var y in strChartLabels){
          this.barChartLabels[y] = strChartLabels[y];
        }
      }

      var realData = [];
      for (const key in data['data']) {
        realData[key] = data['data'][key];
      }
      this.barChartData = [
        {data: realData, label: 'Series A'}
      ];
    });
  }


  ionViewDidLoad() {
    // this.statisticsService.getSatisticshospital(null).subscribe((data)=>{
    //   this.hospital_name = data;

    //   console.log("!!!!!!", data)
    // });
    // console.log('ionViewDidLoad StatisticsMinePage');
  }

  typechange(event){
    this.registertype = event;
    var query = {
      'date_type':this.datetype, 
      'date_Part':this.mydatePart,
      'device_type':this.registertype,
      'chat_type':this.datetype
    };
    // console.log('this is first', this.barChartData)
    
    this.statisticsService.getSatisticsReportChart(query).subscribe((data)=>{
      this.statisticsService.chartdata = data;
      console.log("!!!!!!!!!!", data)
      for (var x in this.statisticsService.chartdata.date){
          this.barChartLabels[x] = this.statisticsService.chartdata.date[x];
      }

      let numbarChartLabels = this.barChartLabels.map(Number);
      for(var i = 0; i < numbarChartLabels.length; i++){
        numbarChartLabels[i]= numbarChartLabels[i] + 1;
      }
      let strChartLabels = numbarChartLabels.map(String);
      this.barChartLabels.length = 0;

      for (var y in strChartLabels){
        this.barChartLabels[y] = strChartLabels[y];
      }

      var realData = [];
      for (const key in data['data']) {
        realData[key] = data['data'][key];
      }
      this.barChartData = [
        {data: realData, label: 'Series A'}
      ];
    });
  }
}

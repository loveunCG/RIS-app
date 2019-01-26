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
  selector: 'page-statistics-mine',
  templateUrl: 'statistics-mine.html',
})
export class StatisticsMinePage {

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

  mydateType:any;          //0:day, 1:month, 2: year 
  myWorkType:any;          //0:patient, 1: report, 2:remote, 3:review 
  mydatePart:any;


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
    this.mydateType = '0';
    this.myWorkType = '0';

    var query = {
      'mydateType':this.mydateType, 
      'myWorkType':this.myWorkType,
      'mydatePart':this.mydatePart
    };
    // console.log('this is first', this.barChartData)
    
    this.statisticsService.getSatisticsChart(query).subscribe((data)=>{
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
      this.mydateType = '0';
      this.mydatePart = year + "-" + month1;      
    }
    else if(status == 1){
      this.mydateType = '1';
      this.mydatePart = year.toString();
    }
    else if(status == 2){
      this.mydateType = '2';
    }
    else if(status == 3){
      this.myWorkType = '0';
    }
    else if(status == 4){
      this.myWorkType = '1';
    }
    else if(status == 5){
      this.myWorkType = '2';
    }
    else if(status == 6){
      this.myWorkType = '3';
    }
    var query = {
      'mydateType':this.mydateType, 
      'myWorkType':this.myWorkType,
      'mydatePart':this.mydatePart
    };
    this.statisticsService.getSatisticsChart(query).subscribe((data)=>{
      this.statisticsService.chartdata = data;
      this.barChartLabels.length = 0;
      this.barChartData.length = 0;
      for (var x in this.statisticsService.chartdata.date){
          this.barChartLabels[x] = this.statisticsService.chartdata.date[x];
      }

      if(this.mydateType == 0){      
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
    if(this.mydateType == 0){
      this.mydatePart = dateval;
    }
    else if(this.mydateType == 1){
      var datevalsplit = dateval.split('-');
      dateval = datevalsplit[0];
      this.mydatePart = dateval;
    }
    var query = {
      'mydateType':this.mydateType, 
      'myWorkType':this.myWorkType,
      'mydatePart':this.mydatePart
    };
    this.statisticsService.getSatisticsChart(query).subscribe((data)=>{
      this.statisticsService.chartdata = data;
      this.barChartLabels.length = 0;
      this.barChartData.length = 0;
      for (var x in this.statisticsService.chartdata.date){
          this.barChartLabels[x] = this.statisticsService.chartdata.date[x];
      }

      if(this.mydateType == 0){      
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
    console.log('ionViewDidLoad StatisticsMinePage');
  }

}

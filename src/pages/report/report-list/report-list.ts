import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { BasePage } from '../../base-page/base-page';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { ReportUserDetailPage } from '../../../pages/report/report-user-detail/report-user-detail';

import { ReportProvider } from '../../../providers/report/report';

/**
 * Generated class for the ReportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-list',
  templateUrl: 'report-list.html',
})
export class ReportListPage extends BasePage {
  @ViewChild('comDuration') comDuration:FromToDateComponent;
  aryStatus:any = ['', '已登记', '已检查', '未审核', '审核通过', '未通过', '检查中', '草稿'];

  recvData:Array<Object> = [];

  inpFilter:string;
  source:string;
  status:string;
  checkup_type:string;
  displayDate:string;
  filteredData:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast:ToastController) { 
    super(toast);
  }

  ionViewDidLoad() {
    this.displayDate = new Date().toLocaleDateString(); 
    
    console.log('ionViewDidLoad ReportListPage', this.displayDate);
    this.onSearch();
  }
  onFilter():void{
    if(!this.inpFilter){
      this.filteredData = this.recvData;
      return;
    }
    let lastData:Array<Object> = [];
    for(var i = 0 ; i < this.recvData.length ; i++){
      var user = this.recvData[i];
      var nm = user['patient_name'] as string;
      if(nm){
        let ddd:number = nm.indexOf(this.inpFilter);
        if(ddd >= 0) lastData.push(user);
      }
    }
    this.filteredData = lastData;
  }
  onSearch():void{
    this.reportService.getReportList(this.source, this.status ,this.comDuration.from, this.comDuration.to, this.checkup_type ).subscribe(data =>{
      if(!data) data = [];
      console.log('this is rvcData', data);
      this.recvData = data as Array<Object>;
      this.onFilter();
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }
  onClickUser(booking_id):void{
    if(!booking_id) return;
    this.navCtrl.push(ReportUserDetailPage, {booking_id:booking_id});
  }
  onClearSearch():void{
    this.filteredData = [];
    this.source = '';
    this.inpFilter = '';
    this.status = '';
    this.comDuration.from = '';
    this.comDuration.to = '';
    this.onSearch();
  }
  onInput(e):void{
    this.onFilter();
  }
  onCancel(e):void{
    this.onFilter();
  }

  ionViewWillEnter(){
    this.onSearch();
  }
}

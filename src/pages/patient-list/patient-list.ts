import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { BasePage } from '../base-page/base-page';
import { FromToDateComponent } from '../../components/from-to-date/from-to-date';
import { LoginPage } from '../login/login';
import { ReportProvider } from '../../providers/report/report';
import { ReportUserDetailPage } from '../../pages/report/report-user-detail/report-user-detail';

/**
 * Generated class for the PatientList page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-patient-list',
  templateUrl: 'patient-list.html',
})
export class PatientList extends BasePage {
  @ViewChild('comDuration') comDuration:FromToDateComponent;
  aryStatus:any = ['', '已登记', '已检查', '未审核', '审核通过', '未通过', '检查中', '草稿'];

  recvData:Array<Object> = [];

  inpFilter:string;
  source:string;
  status:string;
  checkup_type:string;
  displayDate:string;
  filteredData:any = [];
  filteredDataList:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService:ReportProvider, public toast:ToastController, 
              public appCtrl:App) { 
    super(toast);
    this.onSearch();    
  }

  ionViewDidLoad() {
  }
 
  onSearch():void{
    this.reportService.getReportList(null).subscribe(data =>{
      this.filteredDataList = data;
      for(var i=0; i<this.filteredDataList.length; i++){
        if(this.filteredDataList[i].patient_name == '知文'){
          this.filteredData.push(this.filteredDataList[i])
          console.log(i)
        }
      }
      console.log('AAAAAAAAAAAAAAAAAA',data)
    },
    err => {
      this.presentToast("服务器连接失败!");
    });
  }

  logout(){
    this.appCtrl.getRootNav().push(LoginPage);
  }

  onClickUser(booking_id):void{
    if(!booking_id) {
      this.presentToast("보관된 자료과 없습니다.!");
    }
    else{
      this.navCtrl.push(ReportUserDetailPage, {booking_id:booking_id});
    }
  }
}

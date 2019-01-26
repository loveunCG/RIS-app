import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../../providers/report/report';
import { BasePage } from '../../base-page/base-page';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ReportUserDetailImagePage } from '../../../pages/report/report-user-detail-image/report-user-detail-image'; 
/**
 * Generated class for the ReportUserDetailImageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-user-detail-image-list',
  templateUrl: 'report-user-detail-image-list.html',
})



export class ReportUserDetailImageListPage extends BasePage{
  dicomList:any;
  treeflag:boolean=false;
  num:number=0;
  hospital:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public reportService:ReportProvider, public toast:ToastController) {
    super(toast);  
    this.hospital = this.navParams.data.hospital_name;   
    this.reportService.getDicomList(navParams.data.image_num).subscribe( list =>{
      if(typeof(list[0]) == "object"){
        this.dicomList = list;
      }
      else{
        return;
      }
    },
    err =>{ console.error("error"), err;
    return;
  });
  }

  nextpage(studyuid:string, siruid:string, objuid:any){
  this.navCtrl.push(ReportUserDetailImagePage, {studyUID:studyuid, seriesUID:siruid,objectUID:objuid, hospital_name:this.hospital});
 }

}

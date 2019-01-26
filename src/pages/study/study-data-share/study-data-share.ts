import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';

import { BasePage } from '../../base-page/base-page';
import { StudyProvider } from '../../../providers/study/study';
import { StudyDataShareContentPage } from '../../../pages/study/study-data-share-content/study-data-share-content';
/**
 * Generated class for the StudyDataSharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-study-data-share',
  templateUrl: 'study-data-share.html',
})
export class StudyDataSharePage {
  newItem:string;
  datashareList:any;
  folderFlag:boolean = true;
  hosname:any;
  constructor( public navCtrl: NavController,   public navParams: NavParams,private alertCtrl: AlertController, public datashare:StudyProvider) {
    this.datashare.getHospitalShareList(null).subscribe((data)=>{
      this.datashareList = data;
      this.hosname = this.datashareList.hospital_folder;
      console.log("QQQQQQQQQQ",data )
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyDataSharePage');
  }

  // foldMake(){
  //   let prompt = this.alertCtrl.create({
  //     title: 'FoldMAke',
  //     inputs: [
  //       {
  //         name: 'reject_reason',
  //         placeholder: '请输入...'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Saved',
  //         handler: data => {
  //           console.log('Saved clicked', data);
  //           for(var i = 0; i < this.datashareList.length; i++ ){
  //             if(this.datashareList[i] == data.reject_reason){
  //               this.folderFlag = false;
  //             }
  //           }
  //           if(this.folderFlag){
  //             this.adddiv(data.reject_reason);
  //           }
  //           else{
  //                 this.folderFlag = true;
  //                 let alert = this.alertCtrl.create({
  //                 title: '오류',
  //                 subTitle: '해당한 폴더가 이미 존재합니다.',
  //                 buttons: ['확인']
  //               });
  //               alert.present();
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // adddiv(foldername:string){
  //   // var displayDate = new Date().toLocaleDateString();    
  //   // foldername = foldername + "(" + displayDate + ")";
  //   var query = {
  //     dir_name : foldername
  //   }; 
  //   this.datashareList = null;
  //   var displayDate = new Date().toLocaleDateString();
  //   this.datashare.getDataShareList(query).subscribe((data)=>{
  //       this.datashareList = data;
  //   });
  // }

  onClickList(title:string):void{
    this.navCtrl.push(StudyDataShareContentPage,{titlename:title} );  
  }
}

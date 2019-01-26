import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { BasePage } from '../../base-page/base-page';
import { StudyProvider } from '../../../providers/study/study';
import { StudyOnlinePageRoom } from '../../../pages/study/study-online-room/study-online-room';
/**
 * Generated class for the StudyOnlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-study-online',
  templateUrl: 'study-online.html',
})
export class StudyOnlinePage {
  socket:any;
  user_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public studyService:StudyProvider, public alertController:AlertController) {
    this.user_id = this.studyService.getSecretData().id;
    this.studyService.getStudyList(null).subscribe((data)=>{
      this.studyService.onlineData = data;
      console.log("!!!!!!!!!!", this.studyService.onlineData)
    });

  }

  ionViewDidLoad() {

  }

  onClick(roomid:number, title:string, lession_id:string, lession_status:any){
    if(this.user_id == roomid || lession_status==1){
      this.navCtrl.push(StudyOnlinePageRoom, {room_id:roomid, classtitle:title, classlession_id:lession_id})
    }
  }

}

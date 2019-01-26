import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteProvider } from '../../../providers/remote/remote';
import { RemoteMeetingNew2Page } from '../../../pages/remote-meeting-new2/remote-meeting-new2';
/**
 * Generated class for the ReportUserDetailRemotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-user-detail-remote',
  templateUrl: 'report-user-detail-remote.html',
})
export class ReportUserDetailRemotePage {
  booking_id:string;
  remote_status:any;
  image_num:any;
  booking_status:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serverData:RemoteProvider) {
    this.booking_id=this.navParams.data.booking_id;
    this.remote_status=this.navParams.data.remote_status;
    this.image_num=this.navParams.data.image_num;
    this.booking_status=this.navParams.data.booking_status;
    this.serverData.getRemoteView(null).subscribe((data)=>{
      this.serverData.remoteDetail = data;
    });
    console.log("!!!!!!!!!!!",this.remote_status, this.navParams.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportUserDetailRemotePage');
  }
  onMeeting():void{    
    var query = { image_num: this.image_num};
    this.serverData.getpatientInfo(query).subscribe((data)=>{
    this.serverData.remoteDetail.remoteData = data;
    this.serverData.remoteDetail.remoteData.patient_id = data.booking_id;
    this.navCtrl.push(RemoteMeetingNew2Page,{status:1} );
  });
  }
  onQuestion():void{
    var query = { image_num: this.image_num};
    this.serverData.getpatientInfo(query).subscribe((data)=>{
    this.serverData.remoteDetail.remoteData = data;
    this.serverData.remoteDetail.remoteData.patient_id = data.booking_id;
    this.navCtrl.push(RemoteMeetingNew2Page,{status:2});
  });
  }
}

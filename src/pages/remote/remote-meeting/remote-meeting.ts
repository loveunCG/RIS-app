import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteProvider } from '../../../providers/remote/remote';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { RemoteMeetingNew2Page } from '../../../pages/remote-meeting-new2/remote-meeting-new2';
import { RemoteDetailPage } from '../../../pages/remote/remote-detail/remote-detail';
/**
 * Generated class for the RemoteMeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remote-meeting',
  templateUrl: 'remote-meeting.html',
})
export class RemoteMeetingPage {
  public contact_status:any = ["","已提交","草稿","已接受","已拒绝","已结束"];
  usr_is_doctor:string;
  usr_InitiateConsultation:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serverData:RemoteProvider) {
    this.serverData.isDeliberation = false;

    var query = {};
    if(this.serverData.isRemote == 1){
      query = { contact_type: 1};
    }else if(this.serverData.isRemote == 2){
      query = {contact_type: 2};
    }
    this.serverData.remoteList(query).subscribe((data)=>{
      this.serverData.remoteData = data;
    });

    this.usr_is_doctor = this.serverData.getSecretData().usr_is_doctor;
    if(this.usr_is_doctor)
    {
      let doctor_data = this.serverData.getSecretDataValue();
      this.usr_InitiateConsultation = doctor_data.InitiateConsultation;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoteMeetingPage');
  }

  openContactDetail(remoteId){
    this.serverData.getRemoteView(remoteId).subscribe((data)=>{
      this.serverData.remoteDetail = data;
      console.log(this.serverData.remoteDetail.remoteData)
      this.navCtrl.push(RemoteDetailPage);
    });
  }
  onClickReview(status: any):any{
    var query = {};
    if(this.serverData.isRemote == 1){
       query = {
        contact_status: status,
        contact_type: 1
      };
    }
    else if(this.serverData.isRemote == 2) 
    {
       query = {
        contact_status: status,
        contact_type: 2
      };
    }

    this.serverData.remoteList(query).subscribe((data)=>{
      this.serverData.remoteData = data;
      console.log(data);

    });
  }

  onInput(event :any){
    var query = {};
    if(this.serverData.isRemote == 1){
       query = {
        contact_type: 1,
        patient_name: event
      };
    }
    else if(this.serverData.isRemote == 2)
    {
       query = {
        contact_type: 2,
        patient_name: event
      };
    }
    this.serverData.remoteList(query).subscribe((data)=>{
      this.serverData.remoteData = data;
      console.log(data);
    });
  }

  onsearch(value:any){
    var query = {};
    if(value.hasOwnProperty('from')) query["submitstarttime"] = value.from;
    if(value.hasOwnProperty('to')) query["submitendtime"] = value.to;
    query["contact_type"] = 1;
    this.serverData.remoteList(query).subscribe((data)=>{
      this.serverData.remoteData = data;
      console.log(data);
    });
  }
  onaddRemote(){
    this.serverData.getRemoteView(null).subscribe((data)=>{
      this.serverData.remoteDetail = data;
      this.navCtrl.push(RemoteMeetingNew2Page);
    });
  }

}

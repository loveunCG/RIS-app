import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteProvider } from '../../../providers/remote/remote';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { RemoteMeetingNew2Page } from '../../../pages/remote-meeting-new2/remote-meeting-new2';
import { RemoteDetailPage } from '../../../pages/remote/remote-detail/remote-detail';

/**
 * Generated class for the RemoteMinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remote-mine',
  templateUrl: 'remote-mine.html',
})
export class RemoteMinePage {
  public contact_status:any = ["","已提交","草稿","已接受","已拒绝","已结束"];
  usr_id:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSevice:RemoteProvider) {
    this.usr_id = this.dataSevice.getSecretData().id;
    var query = {'tbl_contact_info.req_doctor_name':this.usr_id};
    this.dataSevice.remoteList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoteMinePage');
  }
  openContactDetail(remoteId){
    this.dataSevice.getRemoteView(remoteId).subscribe((data)=>{
      this.dataSevice.remoteDetail = data;
      console.log(this.dataSevice.remoteDetail.remoteData)
      this.navCtrl.push(RemoteDetailPage);
    });
  }
  onClickReview(status: any):any{
    var query = {
      'tbl_contact_info.req_doctor_name':this.usr_id,
      contact_status: status
    };
    this.dataSevice.remoteList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);

    });
  }

  onSearchByContactType(status: any):any{
    var query = {
      'tbl_contact_info.req_doctor_name':this.usr_id,
      contact_type: status
    };
    this.dataSevice.remoteList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);

    });
  }

  onInput(event :any){
    var query = {
      'tbl_contact_info.req_doctor_name':this.usr_id,
      patient_name: event
    };
    this.dataSevice.remoteList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);
    });
  }

  onsearch(value:any){
    var query = {};
    if(value.hasOwnProperty('from')) query["submitstarttime"] = value.from;
    if(value.hasOwnProperty('to')) query["submitendtime"] = value.to;
    query['tbl_contact_info.req_doctor_name'] = this.usr_id
    this.dataSevice.remoteList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);
    });
  }
  onaddRemote(){
    this.dataSevice.getRemoteView(null).subscribe((data)=>{
      this.dataSevice.remoteDetail = data;
      // this.navCtrl.push(RemoteMeetingNew2Page);
    });
  }
}

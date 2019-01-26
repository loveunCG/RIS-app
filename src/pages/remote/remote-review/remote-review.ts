import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../../base-page/base-page';
import { RemoteProvider } from '../../../providers/remote/remote';
import { FromToDateComponent } from '../../../components/from-to-date/from-to-date';
import { RemoteMeetingNew2Page } from '../../../pages/remote-meeting-new2/remote-meeting-new2';
import { RemoteDetailPage } from '../../../pages/remote/remote-detail/remote-detail';
/**
 * Generated class for the RemoteReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remote-review',
  templateUrl: 'remote-review.html',
})
export class RemoteReviewPage {
  @ViewChild('submitDuration') submitDuration:FromToDateComponent;
  @ViewChild('examDuration') examDuration:FromToDateComponent;
  strcontact_type:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSevice:RemoteProvider) {
    this.dataSevice.getremoteReviewList().subscribe((data)=>{
      this.dataSevice.remoteData = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoteReviewPage');
  }

  onInput(event :any){
    var query = {
      patient_name: event
    };
    this.dataSevice.getremoteReviewList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);
    });
  }

  onSearch(value:any){
    var query = {};
    if(this.submitDuration.from) query["submitstarttime"] = this.submitDuration.from;
    if(this.submitDuration.to) query["submitendtime"] = this.submitDuration.to;
    if(this.examDuration.from) query["reviewstarttime"] = this.examDuration.from;
    if(this.examDuration.to) query["reviewendtime"] = this.examDuration.to;
    this.dataSevice.getremoteReviewList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);
    });
  }

  onClickReview(status: any){
    var query = {
      contact_status: status
    };
    this.dataSevice.getremoteReviewList(query).subscribe((data)=>{
      this.dataSevice.remoteData = data;
      console.log(data);

    });
  }
  openContactDetail(remoteId){
    this.dataSevice.getRemoteView(remoteId).subscribe((data)=>{
      this.dataSevice.remoteDetail = data;
      this.navCtrl.push(RemoteDetailPage);
    });
  }
}

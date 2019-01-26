import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteMeetingPage } from '../../pages/remote/remote-meeting/remote-meeting';
import { RemoteQuestionPage } from '../../pages/remote/remote-question/remote-question';
import { RemoteMinePage } from '../../pages/remote/remote-mine/remote-mine';
import { RemoteReviewPage } from '../../pages/remote/remote-review/remote-review';
import { RemoteProvider } from '../../providers/remote/remote';
/**
 * Generated class for the RemotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-remote',
  templateUrl: 'remote.html',
})
export class RemotePage{
  usr_is_doctor:string;
  usr_RemoteConsultation:string;
  usr_RemoteOutpatient:string;
  usr_MyAdvice:string;
  usr_RemoteConsultationReview:string;
  usr_role:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSevice:RemoteProvider) {

    this.usr_is_doctor = this.dataSevice.getSecretData().usr_is_doctor;
    if(this.usr_is_doctor)
    {
      let doctor_data = this.dataSevice.getSecretDataValue();
      this.usr_RemoteConsultation = doctor_data.RemoteConsultation;
      this.usr_RemoteOutpatient = doctor_data.RemoteOutpatient;
      this.usr_MyAdvice = doctor_data.MyAdvice;
      this.usr_RemoteConsultationReview = doctor_data.RemoteConsultationReview;
      this.usr_role = this.dataSevice.getSecretData().usr_role;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotePage');

  }
  goBack():void{
    this.navCtrl.pop();
  }
  onClickMeeting():void{
    this.dataSevice.isRemote = 1;
    this.navCtrl.push(RemoteMeetingPage);
  }
  onClickQuestion():void{
    this.dataSevice.isRemote = 2;
    this.navCtrl.push(RemoteMeetingPage);
  }
  onClickMine():void{
    this.dataSevice.isRemote = 3;
    this.navCtrl.push(RemoteMinePage);
  }
  onClickReview():void{
    this.dataSevice.isRemote = 4;
    this.navCtrl.push(RemoteReviewPage);
  }
}

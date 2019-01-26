import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RemoteProvider } from '../../providers/remote/remote';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemoteMeetingPage } from '../../pages/remote/remote-meeting/remote-meeting';
import { RemoteMeetingNew2Page } from '../../pages/remote-meeting-new2/remote-meeting-new2';
import { RemotMakeReviewPage } from '../../pages/remote/remot-make-review/remot-make-review';
import { RemoteMinePage } from '../../pages/remote/remote-mine/remote-mine';

/**
 * Generated class for the RemoteMeetingNew1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-remote-meeting-new1',
  templateUrl: 'remote-meeting-new1.html',
})
export class RemoteMeetingNew1Page {
  public remoteSubmit:FormGroup;
  public set_check_time:string;
  constructor(public navCtrl: NavController,
    public dataSevice:RemoteProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
      var spresult = [];
      if(this.dataSevice.remoteDetail.remoteData.set_check_time){
        this.set_check_time = this.dataSevice.remoteDetail.remoteData.set_check_time;
      }else{

      }
      let initSethosname = '';
      if(this.dataSevice.remoteDetail.remoteData.set_hospital) initSethosname =this.dataSevice.remoteDetail.remoteData.set_hospital;
    this.remoteSubmit = this.formBuilder.group({
      set_hospital: [initSethosname, Validators.required],
      set_class: [this.dataSevice.remoteDetail.remoteData.set_class, Validators.required],
      setcheckDate: [spresult[0], Validators.required],
      setCheckTime: [spresult[1], Validators.required]
    });
  }

  onReject() {
    let prompt = this.alertCtrl.create({
      title: '咨询回退',
      message: "请输入退回的理由",
      inputs: [
        {
          name: 'reject_reason',
          placeholder: '请输入...'
        },
      ],
      buttons: [
        {
          text: '返回',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '提交',
          handler: data => {
            console.log('Saved clicked', data);
          }
        }
      ]
    });
    prompt.present();
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoteMeetingNew1Page');
  }

  onSave():void{
    this.navCtrl.remove(this.navCtrl.length()-2);
    this.dataSevice.remoteSubmit.save_status = 2;
    if(this.dataSevice.isRemote == 1){
      this.dataSevice.remoteSubmit.contact_type = 1;
    }
    else if(this.dataSevice.isRemote == 2)
    {
      this.dataSevice.remoteSubmit.contact_type = 2;
    }
    else if(this.dataSevice.isRemote == 3)
    {
      this.dataSevice.remoteSubmit.contact_type =this.dataSevice.remoteDetail.remoteData.contact_type;
    }
    let remoteDataPlus = this.remoteSubmit.value;
    for (let key in remoteDataPlus) {
      if (remoteDataPlus.hasOwnProperty(key)) {
        this.dataSevice.remoteSubmit[key]= remoteDataPlus[key];
      }

    }
    console.log(this.dataSevice.remoteSubmit);
    if(!this.dataSevice.remoteSubmit.hasOwnProperty("patient_id")||this.dataSevice.remoteSubmit.patient_id==''){
      this.presentToast('请输入患者的信息');
      return;

    }

    this.dataSevice.sendRequest(this.dataSevice.Const.urlsaveRemote,
      this.dataSevice.remoteSubmit).subscribe((data)=>{
        if(data['status'] == "success"){
            this.navCtrl.pop();
        }else{

        }
    });
  }

  onNext():void{
    this.navCtrl.remove(this.navCtrl.length()-2);
    this.dataSevice.remoteSubmit.set_hospital =this.remoteSubmit.value.set_hospital;
    this.dataSevice.remoteSubmit.set_class =this.remoteSubmit.value.set_class;
    this.dataSevice.remoteSubmit.setcheckDate =this.remoteSubmit.value.setcheckDate;
    this.dataSevice.remoteSubmit.setCheckTime =this.remoteSubmit.value.setCheckTime;
    this.dataSevice.remoteSubmit.select_doctor =this.remoteSubmit.value.select_doctor;
    this.dataSevice.remoteSubmit.contact_id =this.dataSevice.remoteDetail.remoteData.contact_id;
    if(this.dataSevice.isRemote == 1){
      this.dataSevice.remoteSubmit.contact_type = 1;
    }
    else if(this.dataSevice.isRemote == 2)
    {
      this.dataSevice.remoteSubmit.contact_type = 2;
    }
    else if(this.dataSevice.isRemote == 3)
    {
      this.dataSevice.remoteSubmit.contact_type =this.dataSevice.remoteDetail.remoteData.contact_type;
    }
    this.dataSevice.remoteSubmit.save_status = 1;
    this.dataSevice.sendRequest(this.dataSevice.Const.urlsaveRemote,
      this.dataSevice.remoteSubmit).subscribe((data)=>{
        if(data['status'] == "success"){
            this.navCtrl.pop();
        }else{

        }
    });
    this.navCtrl.pop();
  }
  onDeliberation():any{
    this.navCtrl.push(RemotMakeReviewPage);
  }
  onReview(remoteId){
    this.dataSevice.getRemoteView(remoteId).subscribe((data)=>{
      this.dataSevice.remoteDetail = data;
      this.navCtrl.push(RemotMakeReviewPage);
    });
  }

}

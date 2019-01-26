import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteProvider } from '../../../providers/remote/remote';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
/**
 * Generated class for the RemotMakeReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-remot-make-review',
  templateUrl: 'remot-make-review.html',
})
export class RemotMakeReviewPage {
  ischecked:boolean=false;
  remoteReviewSubmit:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSevice:RemoteProvider, public formBuilder:FormBuilder) {
    var dateary = this.dataSevice.remoteDetail.remoteData.set_check_time.split(' ');
    this.remoteReviewSubmit = this.formBuilder.group({
      contact_title: ['', Validators.required],
      password: ['', Validators.required],
      mem_doc_id: ['', Validators.required],
      set_check_date: [dateary[0], Validators.required],
      set_check_time: [dateary[1], Validators.required],
      control_date: ['', Validators.required],
      control_time: ['', Validators.required],
      contact_id: [this.dataSevice.remoteDetail.remoteData.contact_id, Validators.required],
      notPass_cause: ['', Validators.required],
      });
  }

  notPass():void{
    this.navCtrl.remove(this.navCtrl.length()-3, 2);
    this.dataSevice.remoteReviewSubmit = this.remoteReviewSubmit.value;
    this.dataSevice.remoteReviewSubmit.mem_doc_id =this.remoteReviewSubmit.value.mem_doc_id;
    this.dataSevice.remoteReviewSubmit.notPass_cause =this.remoteReviewSubmit.value.notPass_cause;
    this.dataSevice.sendRequest(this.dataSevice.Const.urlRomoteReviewListSave,
      this.dataSevice.remoteReviewSubmit).subscribe((data)=>{
        if(data['status'] == "success"){
            this.navCtrl.pop();
        }else{
        }
    });
  }
  onsubmitdeli():void{
    this.navCtrl.remove(this.navCtrl.length()-3, 2);
    this.dataSevice.remoteReviewSubmit = this.remoteReviewSubmit.value;
    this.dataSevice.remoteReviewSubmit.contact_title =this.remoteReviewSubmit.value.contact_title;
    this.dataSevice.remoteReviewSubmit.password =this.remoteReviewSubmit.value.password;
    this.dataSevice.remoteReviewSubmit.mem_doc_id =this.remoteReviewSubmit.value.mem_doc_id;
    this.dataSevice.remoteReviewSubmit.set_check_date =this.remoteReviewSubmit.value.set_check_date;
    this.dataSevice.remoteReviewSubmit.set_check_time =this.remoteReviewSubmit.value.set_check_time;
    this.dataSevice.remoteReviewSubmit.control_date =this.remoteReviewSubmit.value.control_date;
    this.dataSevice.remoteReviewSubmit.control_time =this.remoteReviewSubmit.value.control_time;
    this.dataSevice.remoteReviewSubmit.contact_id =this.remoteReviewSubmit.value.contact_id;
    this.dataSevice.sendRequest(this.dataSevice.Const.urlRomoteReviewListSave,
      this.dataSevice.remoteReviewSubmit).subscribe((data)=>{
        if(data['status'] == "success"){
            this.navCtrl.pop();
        }else{

        }
    });
  }

  addValue(e): void{
    if(this.ischecked){
      this.ischecked = false;
      this.remoteReviewSubmit.value.notPass_cause = " ";
    }
    else{
      this.remoteReviewSubmit.value.notPass_cause = "";
      this.ischecked = true;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotMakeReviewPage');
  }

}

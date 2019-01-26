import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading  } from 'ionic-angular';
// import { File } from '@ionic-native/file';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { RemoteMeetingNew1Page } from '../../../pages/remote-meeting-new1/remote-meeting-new1';
import { RemoteProvider } from '../../../providers/remote/remote';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemoteMeetingPage } from '../../../pages/remote/remote-meeting/remote-meeting';
import { GESTURE_GO_BACK_SWIPE } from 'ionic-angular/gestures/gesture-controller';
import { RemoteMinePage } from '../../../pages/remote/remote-mine/remote-mine';
import { RemotMakeReviewPage } from '../../../pages/remote/remot-make-review/remot-make-review';

import { HttpModule } from '@angular/http';

/**
 * Generated class for the RemoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;


@Component({
  selector: 'page-remote-detail',
  templateUrl: 'remote-detail.html',
})
export class RemoteDetailPage {
  private remoteSubmit : FormGroup;
  lastImage: string = null;
  loading: Loading;
  private isremoteflag:boolean =false; 

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public dataSevice: RemoteProvider,
    public loadingCtrl: LoadingController) {
      if(this.navParams.data.status){
        this.dataSevice.isRemote = this.navParams.data.status;
      }
      if(this.dataSevice.remoteDetail.remoteData){
        var contact_status = this.dataSevice.remoteDetail.remoteData.contact_status;
        if(contact_status==1||contact_status==3||contact_status==4||contact_status==5){
          this.dataSevice.isSave = false;
        }else{
          this.dataSevice.isSave = true;
        }
      }

      if(dataSevice.isRemote == 4){
        this.isremoteflag = true;
      }
  }


  onReview(remoteId){
    this.dataSevice.getRemoteView(remoteId).subscribe((data)=>{
      this.dataSevice.remoteDetail = data;
      this.navCtrl.push(RemotMakeReviewPage);
    });
  }

  ionViewDidLoad() {
    console.log("###############",this.dataSevice);
  }

}

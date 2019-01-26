import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import {BaseProvider} from '../../../providers/base/base';
import { LoginPage } from '../../login/login';

/**
 * Generated class for the TabMyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-tab-my-info',
  templateUrl: 'tab-my-info.html',
})
export class TabMyInfoPage {
  userdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public dataSevice:BaseProvider) {
    this.userdata=this.dataSevice.getSecretData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabMyInfoPage');
  }

  logout(){
    this.appCtrl.getRootNav().push(LoginPage);
  }
}

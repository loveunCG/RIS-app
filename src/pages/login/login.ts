import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { FindpasswordPage } from '../../pages/findpassword/findpassword';
import { HomePage } from '../home/home';
import { BasePage } from '../base-page/base-page';
import { AuthProvider } from '../../providers/auth/auth';
import {  HttpHeaders } from '@angular/common/http';
import { PatientList } from '../../pages/patient-list/patient-list';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {
  suersecdata:any;
  constructor(public auth:AuthProvider, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    super(toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(inpId: HTMLInputElement, inpPwd: HTMLInputElement): void {
    console.log(`user login: ${inpId.value} and link: ${inpPwd.value}`);
    var user_id = inpId.value;
    var user_pwd = inpPwd.value;
    if(!user_id || !user_pwd){
      return this.presentToast('账号或密码错输入误!');
    }

    this.auth.login(user_id, user_pwd).subscribe(data => { 
      console.log("!!!!!!!", data)     
      if(data['id_token']){
        this.auth.setTokenHeader(data['id_token']);
        this.auth.setSecretData(data);
        if(this.auth.getSecretData().usr_is_doctor){
          this.navCtrl.setRoot(HomePage);          
        }
        else{
          this.navCtrl.setRoot(PatientList); 
        }
      }
      else{
        this.presentToast('账号或密码错误!');
      }
    },
    err =>{
      this.presentToast('服务器连接失败!');
    });
  }
  onSignup():void{
    this.navCtrl.push(SignupPage);
  }
  onFindPassword():void{
    this.navCtrl.push(FindpasswordPage);
  }

 

}

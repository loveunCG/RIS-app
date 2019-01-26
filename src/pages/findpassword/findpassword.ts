import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators,  FormBuilder, FormGroup } from '@angular/forms';
import {LoginPage} from '../login/login';
import { BasePage } from '../base-page/base-page';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the FindpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-findpassword',
  templateUrl: 'findpassword.html',
})
export class FindpasswordPage extends BasePage{
  private forgetPassword: FormGroup;
  public isDuplication:boolean;
  private smsCode:string = "";
  myCount:number;
  public phonenum:boolean;
  public btnval:string = "发送验证码";
  interval:any;
  
  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
      super(toastCtrl);
      this.forgetPassword = this.formBuilder.group({
      phoneNum: ['', Validators.required],
      smsCode: ['', Validators.required],
      password: ['', Validators.required],
      rpassword: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    
 
  }

  onFindPassword():void{
    let message = '';
    let subdata = {};
    let forgetData = this.forgetPassword.value;
    if(forgetData.password != forgetData.rpassword) message = "密码输入不相同";
    // if(this.smsCode === "") {
    //     message = "请您发验证信息";
    // }
    // if(signUpData.smsCode != this.smsCode) message = "验证码错了";
    if(message != ""){
      this.presentToast(message);
      return;
    }
    subdata = {
      pat_id: forgetData.phoneNum,
      password: forgetData.password,
      smsCode: forgetData.smsCode
    }
    this.authService.forgetPassword(subdata).subscribe(data => {
      console.log("11111111111",data);
      if(data['status'] == true){
        this.presentToast('密码设置已成功了!')
        this.navCtrl.push(LoginPage);
      }
      else{
        this.isDuplication = true;
        this.presentToast('该账号重负 请再输入...');
      }
    },
    err =>{
      this.presentToast('密码改修失败了..');
    });

  }


  onSendCode():void{

    let forgetData = this.forgetPassword.value
    if(!forgetData.phoneNum){
      this.presentToast('请输入手机号码');
      return;
    }else{
      this.phonenum = true;
      this.myCount = 60;
  
      this.isDuplication = true;
      this.phonenum = true;
      this.interval = setInterval(()=>{
        this.myCount--;
        this.btnval = this.myCount.toString();
        console.log("!!!!!!!!!!",this.myCount )
        if(this.myCount == 0){
          clearInterval(this.interval);
          this.btnval = "发送验证码"
          this.phonenum = false;
          this.isDuplication = false;
          this.forgetPassword = this.formBuilder.group({
            phoneNum: [this.forgetPassword.value.phoneNum, Validators.required],
            smsCode: ['', Validators.required],
            password: [this.forgetPassword.value.password, Validators.required],
            rpassword: [this.forgetPassword.value.rpassword, Validators.required]
          });
        }
      },1000);
    }
    this.authService.sendSMS(this.forgetPassword.value.phoneNum).subscribe(data => {
      console.log("!!!!!!!!!!!!", data);
    },
    err =>{
      this.presentToast('服务器连接失败!');
      console.log('Error', err);
    });
  }

  reset(){
    // clearInterval(this.interval);
    // this.interval = 0
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Validators,  FormBuilder, FormGroup } from '@angular/forms';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { HomePage } from '../home/home';
import { BasePage } from '../base-page/base-page';
import { PatientList } from '../../pages/patient-list/patient-list';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage extends BasePage{
  private signUpInfo: FormGroup;
  public isDuplication:boolean;
  public isCheckSMS:boolean;
  private smsCode:string = '';
  myCount:number;
  public phonenum:boolean;
  public btnval:string = "发送验证码";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
    ) {
      super(toastCtrl);
    this.isDuplication = true;
    this.signUpInfo = this.formBuilder.group({
      phoneNum: ['', Validators.required],
      smsCode: ['', Validators.required],
      patName: ['', Validators.required],
      patIDNum: ['', Validators.required],
      password: ['', Validators.required],
      rpassword: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  onSendCode(): void {
    if (isNaN(this.signUpInfo.value.phoneNum)) {
      this.presentToast('该手机号码错了...');
      return ;
    }

    this.phonenum = true;
    this.myCount = 60;
    this.isDuplication = true;
    this.phonenum = true;
    let interval = setInterval(()=>{
      this.myCount--;
      this.btnval = this.myCount.toString();
      if(this.myCount == 0){
        clearInterval(interval);
        this.btnval = "发送验证码"
        this.phonenum = false;
        this.isDuplication = false;
        this.signUpInfo = this.formBuilder.group({
          phoneNum: [this.signUpInfo.value.phoneNum, Validators.required],
          smsCode: ['', Validators.required],
          patName: [this.signUpInfo.value.patName, Validators.required],
          patIDNum: [this.signUpInfo.value.patIDNum, Validators.required],
          password: [this.signUpInfo.value.password, Validators.required],
          rpassword: [this.signUpInfo.value.rpassword, Validators.required]
        });
      }
    },1000);

    this.authService.sendSMS(this.signUpInfo.value.phoneNum).subscribe(data => {
    },
    err =>{
      this.presentToast('服务器连接失败!');
      console.log('Error', err);
    });
  }
  onSignup(): void {
    let message = '';
    let signUpData = this.signUpInfo.value;
    if(signUpData.password != signUpData.rpassword) message = "密码输入不相同";
    if(signUpData.patName == "") return;
    // if(this.smsCode === "") {
    //     message = "请您发验证信息";
    // }
    if(signUpData.patIDNum == "") return;
    // if(signUpData.smsCode != this.smsCode) message = "验证码错了";
    if(message != ""){
      this.presentToast(message);
      return;
    }
    this.authService.signUpSubmit(signUpData).subscribe(data => {
      console.log("!!!!!!!!!!!!!", data)
      if(data){
        this.authService.login(signUpData.phoneNum, signUpData.password).subscribe(data => { 
          if(data['id_token']){
            this.authService.setTokenHeader(data['id_token']);
            this.authService.setSecretData(data);
            this.navCtrl.setRoot(PatientList);
          }
          else{
            this.presentToast('账号或密码错误!');
          }
        },
        err =>{
          this.presentToast('服务器连接失败!');
        });
        // this.authService.setTokenHeader(data['id_token']);
        // this.authService.setSecretData(data);
        // this.navCtrl.push(HomePage);
      }
      else{
        this.isDuplication = true;
        this.presentToast('该账号重负 请再输入...1');
      }
    },
    err =>{
      this.presentToast('注册失败了..2');
    });

  }

  duplicationCheck(event) {
    if (isNaN(this.signUpInfo.value.phoneNum)) {
      this.presentToast('该手机号码错了...');
      return ;
    }
    var data = {phone: this.signUpInfo.value.phoneNum};
    this.authService.duplication(this.signUpInfo.value.phoneNum).subscribe(data =>{
      console.log(data);
      if(data['status']){
        this.isDuplication = false;
        console.log("1111",data['status']);
      }else{
        this.isDuplication = true;
        this.presentToast('该账号重负 请再输入...');
        console.log("222",data['status']);
      }
    },
    err=>{
      console.log('');
    });
  }
}

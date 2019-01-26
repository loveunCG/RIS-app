import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseProvider} from '../base/base';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider extends BaseProvider{
  constructor(public http: HttpClient) {
    super(http);
  }

  checkAuth(): any{
    return new Promise((resolve, reject) => {
      this.sendRequest('checkauth', '').subscribe(data => {
        resolve('ok');
      },
      err =>{
        resolve('fail');
      });
    });
  }

  login(user_id:string, user_pwd:string):any{
    var param = {username:user_id, password:user_pwd};
    return this.sendRequest(this.Const.urlLogin, param);
  }

  sendSMS(phoneNum: string):any{
    var param =  {phonenum:phoneNum};
    return this.sendRequest(this.Const.urlSendSMS, param);
  }

  forgetPassword(data: any){
    console.log(this.Const.urlForgetPassword);
    return this.sendRequest(this.Const.urlForgetPassword, data);
  }

  signUpSubmit(Data: any):any{
    console.log(Data)
    return this.sendRequest(this.Const.urlRegister, Data);
  }

  duplication(Data: any):Observable<Object>{
    return this.sendRequest(this.Const.urlCheckDuplication, {phonenum: Data});
  }


}

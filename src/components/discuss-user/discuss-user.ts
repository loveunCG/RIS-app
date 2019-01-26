import { Component, Input } from '@angular/core';

/**
 * Generated class for the DiscussUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'discuss-user',
  templateUrl: 'discuss-user.html'
})
export class DiscussUserComponent {
  @Input()
  strStatus:string;
  @Input()
  urlAvatar: string;
  @Input()
  txtName: string;
  @Input()
  txtDate: string;
  @Input()
  txtTitle: string;


  constructor() {
    console.log('Hello DiscussUserComponent Component');
    // this.urlAvatar = './assets/imgs/logo.png';
    // this.txtName = 'txtName';
    // this.txtDate = '2017-11-17';
    // this.txtCount = 10;
    // this.txtTitle = 'txtTitle';
    // this.txtContent = 'txtContent';
  }

}

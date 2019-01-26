import { Component, Input } from '@angular/core';

/**
 * Generated class for the UserItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html'
})
export class UserItemComponent {
  @Input()
  strName:string;
  @Input()
  strSex:string;
  @Input()
  nAge:number;
  @Input()
  strSummary:string;
  @Input()
  strStatus:string;

  constructor() {
    console.log('Hello UserItemComponent Component');
    // this.strName = '';
    // this.strSex = 'male';
    // this.nAge = 0;
    // this.strSummary = '';
    // this.strStatus = '';
  }

}

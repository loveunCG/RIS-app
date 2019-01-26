import { Component, Input } from '@angular/core';

/**
 * Generated class for the OnlineVideoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'online-video',
  templateUrl: 'online-video.html'
})
export class OnlineVideoComponent {
  // txtName: string;
  // txtTitle:string;
   urlAvatar:string;
  @Input()
  txtName:string;
  @Input()
  txtTitle:string;
  // @Input()
  // urlAvatar:number;
  constructor() {
    console.log('Hello OnlineVideoComponent Component');
    // this.txtName = 'Hello';
    // this.txtTitle = "bbb";
    this.urlAvatar = "./assets/imgs/play.png";
  }
}

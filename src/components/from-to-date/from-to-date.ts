import { Component, Input } from '@angular/core';
/**
 * Generated class for the FromToDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'from-to-date',
  templateUrl: 'from-to-date.html'
})
export class FromToDateComponent {
  @Input()
  title: string;
  from:string;
  to:string;

  constructor() {
    console.log('Hello FromToDateComponent Component');
    this.title = '';
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabHomePage } from '../../pages/home/tab-home/tab-home';
import { TabMessagePage } from '../../pages/home/tab-message/tab-message';
import { TabMyInfoPage } from '../../pages/home/tab-my-info/tab-my-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1 = TabHomePage;
  tab2 = TabMessagePage;
  tab3 = TabMyInfoPage;

  constructor(public navCtrl: NavController) {

  }

}

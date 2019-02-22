import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	Data=[1,2,3,4,5]
  constructor(public navCtrl: NavController) {

  }

}

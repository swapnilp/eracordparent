import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(public navCtrl: NavController) {
  }
  goToExams(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ExamsPage);
  }
}

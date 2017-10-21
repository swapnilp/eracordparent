import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-mpin-login',
  templateUrl: 'mpin-login.html'
})
export class MpinLoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToRegister(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterPage);
  }goToExams(params){
    if (!params) params = {};
    //this.navCtrl.push(ExamsPage);
    this.navCtrl.setRoot(ExamsPage);
  }
}

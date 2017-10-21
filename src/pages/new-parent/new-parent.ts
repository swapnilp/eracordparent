import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterParentPage } from '../register-parent/register-parent';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { RegisterPage } from '../register/register';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-new-parent',
  templateUrl: 'new-parent.html'
})
export class NewParentPage {

  constructor(public navCtrl: NavController) {
  }
  goToRegisterParent(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterParentPage);
  }goToMpinLogin(params){
    if (!params) params = {};
    this.navCtrl.push(MpinLoginPage);
  }goToRegister(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterPage);
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.push(ExamsPage);
  }
}

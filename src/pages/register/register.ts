import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
  }
  goToMpinLogin(params){
    if (!params) params = {};
    this.navCtrl.push(MpinLoginPage);
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.push(ExamsPage);
  }
}

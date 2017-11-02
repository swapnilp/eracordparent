import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { RegisterPage } from '../register/register';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-register-parent',
  templateUrl: 'register-parent.html'
})
export class RegisterParentPage {
  name:any;
  mobile:any;
  
  constructor(public navCtrl: NavController, public params: NavParams, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.name = params.get('name');
    this.mobile = params.get('mobile');
  }

  goToMpinLogin(params){
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

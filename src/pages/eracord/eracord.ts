import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { NewParentPage } from '../new-parent/new-parent';
import { RegisterParentPage } from '../register-parent/register-parent';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-eracord',
  templateUrl: 'eracord.html'
})
export class EracordPage {
  menu:any;
  
  constructor(public navCtrl: NavController, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
  }
  goToNewParent(params){
    if (!params) params = {};
    this.navCtrl.push(NewParentPage);
  }goToRegisterParent(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterParentPage);
  }goToMpinLogin(params){
    if (!params) params = {};
    this.navCtrl.push(MpinLoginPage);
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.push(ExamsPage);
  }
}

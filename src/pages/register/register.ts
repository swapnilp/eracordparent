import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  menu:any;
  
  constructor(public navCtrl: NavController, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
  }
  
  goToMpinLogin(params){
    if (!params) params = {};
    this.navCtrl.push('MpinLoginPage');
  }
}

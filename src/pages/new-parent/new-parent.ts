import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterParentPage } from '../register-parent/register-parent';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { RegisterPage } from '../register/register';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-new-parent',
  templateUrl: 'new-parent.html'
})
export class NewParentPage {
  parentForm: FormGroup;
  menu:any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.parentForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  registerParent():void {
    if(this.parentForm.valid) {
      let params = this.parentForm.value;
      this.navCtrl.push(RegisterParentPage, params);
    }
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

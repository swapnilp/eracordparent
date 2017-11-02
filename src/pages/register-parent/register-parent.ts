import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  parentForm: FormGroup;
  hasError:boolean = false;
  errors: any;
  errorClass:any = 'error';
  menu:any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.name = params.get('name');
    this.mobile = params.get('mobile');
    
    this.parentForm = formBuilder.group({
      name: [this.name],
      mobile: [this.mobile],
      device_id: [localStorage.getItem('deviceId')],
      email: [''],
      mpin: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
      confirm_mpin: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
      token: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  register():void {
    //this.hasError= true;
    //this.errorClass= 'success';
    //this.errors= "asdasdasd";
    this.navCtrl.push(MpinLoginPage);
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

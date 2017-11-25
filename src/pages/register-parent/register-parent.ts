import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { RegisterPage } from '../register/register';
import { ExamsPage } from '../exams/exams';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';

@Component({
  selector: 'page-register-parent',
  templateUrl: 'register-parent.html'
})
export class RegisterParentPage {
  name:any;
  mobile:any;
  email:any;
  parentForm: FormGroup;
  hasError:boolean = false;
  errors: any;
  errorClass:any = 'error';
  menu:any;
  loading:any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams, public menuCtr: MenuController, public authService: AuthService, public alertService: AlertService, public loadingController: LoadingController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.name = params.get('name');
    this.mobile = params.get('mobile');
    this.email = params.get('email');
    
    this.parentForm = formBuilder.group({
      name: [this.name],
      mobile: [this.mobile],
      device_id: [localStorage.getItem('deviceId')],
      email: [this.email || ''],
      mpin: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
      confirm_mpin: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
      token: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  register():void {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });  
    this.loading.present();

    if(this.parentForm.valid) {
      let values  = this.parentForm.value;
      if(values.mpin === values.confirm_mpin ) {
        var data = "&parent[name]=" + values.name + "&parent[mobile]=" + values.mobile+ "&parent[device_id]=" + values.device_id+ "&parent[email]=" + values.email + "&parent[mpin]=" + values.mpin+ "&parent[confirm_mpin]=" + values.confirm_mpin + "&parent[token]=" +values.token + "&parent[os]=android";
        
        this.authService.getPostData(data,'register_parent/register').then((result) => {
          this.loading.dismiss();
          if(result['success']) {
            localStorage.setItem('mobile', values.mobile);
            this.navCtrl.setRoot(MpinLoginPage);
          } else{
            this.hasError= true;
            this.errorClass= 'error';
            this.errors= result['error'];
          }
        }, (err) => {
          this.loading.dismiss();
          var msg = JSON.parse(err._body).errors;
          this.alertService.warning(msg);
        });
      } else {
        this.loading.dismiss();
        this.alertService.warning("Confirm Mpin not match");
      }
      
    }
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

import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterParentPage } from '../register-parent/register-parent';
import { MpinLoginPage } from '../mpin-login/mpin-login';
import { RegisterPage } from '../register/register';
import { ExamsPage } from '../exams/exams';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';

@Component({
  selector: 'page-new-parent',
  templateUrl: 'new-parent.html'
})
export class NewParentPage {
  parentForm: FormGroup;
  menu:any;
  loading:any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public menuCtr: MenuController, public authService: AuthService, public alertService: AlertService, public loadingController: LoadingController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.parentForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  registerParent():void {
    if(this.parentForm.valid) {
      this.loading = this.loadingController.create({
        spinner: 'bubbles',
        content: "Please wait..."
      });  
      let params = this.parentForm.value;
      var data = "&register_parent[device_id]=" + localStorage.getItem('deviceId') + "&register_parent[mobile]=" + params.mobile + "&register_parent[name]=" + params.name;
      this.loading.present();
      this.authService.getPostData(data,'register_parent').then((result) => {
        this.loading.dismiss();
        localStorage.removeItem('mobile');
        if(result['email']) {
          params['email'] = result['email'];
        }
        this.navCtrl.push(RegisterParentPage, params);
      }, (err) => {
        this.loading.dismiss();
        var msg = JSON.parse(err._body).errors;
        this.alertService.warning(msg);
      });
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

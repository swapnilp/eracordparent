import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-mpin-login',
  templateUrl: 'mpin-login.html'
})
export class MpinLoginPage {
  responseData : any;
  userData = {"device_id": "123456","mpin": "", "mobile": "9850840777"};

  constructor(public navCtrl: NavController, public authService: AuthService, public events: Events, public alertService: AlertService) {
  }

  goToRegister(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterPage);
  }
  
  login(): void {
    var data = "&parent[device_id]="+this.userData.device_id+"&parent[mobile]="+this.userData.mobile+"&parent[mpin]="+this.userData.mpin;
    
    this.authService.postData(data,'sign_in').then((result) => {
      this.responseData = result;
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.events.publish('user:login', "Swapnil Patil");

    }, (err) => {
      var msg = JSON.parse(err._body).message;
      this.alertService.warning(msg);
      // Error log
    });

    
  }
}

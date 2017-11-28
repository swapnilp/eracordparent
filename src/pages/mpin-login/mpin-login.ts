import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import { NewParentPage } from '../new-parent/new-parent';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-mpin-login',
  templateUrl: 'mpin-login.html'
})
export class MpinLoginPage {
  responseData : any;
  userData = {"device_id": localStorage.getItem('deviceId'),"mpin": "", "mobile": localStorage.getItem('mobile')};
  loading:any;
  menu:any;
  mobile:any='';
  payment: any = "normal";

  constructor(public navCtrl: NavController, public authService: AuthService, public events: Events, public alertService: AlertService, public loadingController: LoadingController, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.mobile = localStorage.getItem('mobile');
  }

  goToNewParent(params){
    if (!params) params = {};
    this.navCtrl.push(NewParentPage);
  }
  
  login(): void {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });  
    this.loading.present();
    var data = "&parent[device_id]="+this.userData.device_id+"&parent[mobile]="+this.userData.mobile+"&parent[mpin]="+this.userData.mpin;
    
    this.authService.postData(data,'sign_in').then((result) => {
      this.loading.dismiss();
      this.menu.enable(true);
      this.responseData = result;
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      localStorage.setItem('paymentPriority', this.responseData.payment_priority);
      this.events.publish('user:login', "Swapnil Patil");
    }, (err) => {
      this.loading.dismiss();
      var msg = JSON.parse(err._body).message;
      this.alertService.warning(msg);
      // Error log
    });

    
  }
}


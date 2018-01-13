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
  passcode:any = "";

  constructor(public navCtrl: NavController, public authService: AuthService, public events: Events, public alertService: AlertService, public loadingController: LoadingController, public menuCtr: MenuController) {
    this.menu = menuCtr;
    this.menu.enable(false);
    this.mobile = localStorage.getItem('mobile');
  }

  
  add(value) {
    if(this.passcode.length < 4) {
      this.alertService.dismiss();
      this.passcode = this.passcode + value;
      if(this.passcode.length == 4) {
        setTimeout(() => {
          this.login();
        }, 500);
      }
    }
  }

  delete(): void {
    if(this.passcode.length > 0) {
      this.passcode = this.passcode.substring(0, this.passcode.length - 1);
    }
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
    var data = "&parent[device_id]="+this.userData.device_id+"&parent[mobile]="+this.userData.mobile+"&parent[mpin]="+ this.passcode;
    
    this.authService.postData(data,'sign_in').then((result) => {
      this.loading.dismiss();
      if(result["success"]) {
        this.menu.enable(true);
        this.alertService.dismiss();
        this.responseData = result;
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        localStorage.setItem('paymentPriority', this.responseData.payment_priority);
        if(result['remove_push']) {
          localStorage.removeItem('pushId');
        }
        this.events.publish('user:login', "Swapnil Patil");
      } else {
        if(result['invalid']) {
          localStorage.removeItem('userData');
          localStorage.removeItem('paymentPriority');
          localStorage.removeItem('mobile');
          this.navCtrl.push(NewParentPage);
        }
        this.alertService.warning(result["message"]);
      }
    }, (err) => {
      this.loading.dismiss();
      this.passcode = ""
      var msg = JSON.parse(err._body).message;
      this.alertService.warning(msg);
      // Error log
    });

    
  }
}


import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertService {

  constructor(public http: Http, public toastCtrl: ToastController) {
    console.log('Hello AlertServiceProvider Provider');
  }

  warning(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000,
      showCloseButton: true,
      closeButtonText: 'X'
    });
    toast.present();
  }

  success(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000,
      showCloseButton: true,
      closeButtonText: 'X',
      cssClass: 'success'
    });
    toast.present();
  }

  backBtn() {
    let toast = this.toastCtrl.create({
      message: 'Press Again to exit',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  
}

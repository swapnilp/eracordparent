import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the PaymentHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html',
})
export class PaymentHistoryPage {
  payments:any = [];
  totalCount: any = 0;
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.getHistory();
  }
  
  getHistory() {
    this.authService.getApiData('parent_payments', {}, null, this).then((result) => {
      this.totalCount = result['total_count'];
      if(result['payments']){
        for(let payment of result['payments']) {
          setTimeout(() => {
            this.payments.push(payment);
          }, 500);
      
        }
      }
      if(this.loading) {
        this.loading.dismiss();
      }
    });
  }
  

}

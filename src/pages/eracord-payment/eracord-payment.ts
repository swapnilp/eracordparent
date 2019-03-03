import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';

@IonicPage()
@Component({
  selector: 'page-eracord-payment',
  templateUrl: 'eracord-payment.html'
})
export class EracordPaymentPage {
  paymentForm: FormGroup;
  browser:any;
  amounts:any = [] ;
  loading: any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams, public alertService: AlertService, public loadingController: LoadingController, public authService: AuthService) {
    this.loadAmounts();
    this.paymentForm = formBuilder.group({
      amount_id: ['',  Validators.compose([Validators.required])]
    });
  }

  loadAmounts() {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loading.present();
    this.authService.getApiData('payments/new', "", null, this).then((result) => {
      if(result['success']) {
        this.amounts = result['amounts'];
      }
      if(this.loading){
        this.loading.dismiss();
      }
    });
  }
  
  registerPayment() {
    if(this.paymentForm.valid) {
      this.loading = this.loadingController.create({
        spinner: 'bubbles',
        content: "Please wait..."
      });  
      let params = this.paymentForm.value;
      var data = "&parent_payment[plan_id]=" + params.amount_id;
      this.loading.present();
      
      this.authService.getPostData(data,'payments', true).then((result) => {
        this.loading.dismiss();
        if(result['success']) {
          let token = result['order_id'];
          this.goToPaymentInfo(token);
        } else {
          this.alertService.warning(result['errors']);
        }
      }, (err) => {
        this.loading.dismiss();
        var msg = JSON.parse(err._body).errors;
        this.alertService.warning(msg);
      });
    }
  }
  
  goToPaymentHistory() {
    this.navCtrl.push('PaymentHistoryPage');
  } goToApplyCoupon() {
    this.navCtrl.push('ApplyCouponPage');
  } goToPaymentInfo(orderId) {
    this.navCtrl.push('PaymentInfoPage', {
      'orderId': orderId
    });
  }
}

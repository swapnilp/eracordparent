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
          this.payNow(token);
        } else {
          this.alertService.warning(result['message']);
        }
      }, (err) => {
        this.loading.dismiss();
        var msg = JSON.parse(err._body).errors;
        this.alertService.warning(msg);
      });
    }
  }
  
  payNow(token) {
    this.alertService.warning("asdasd");
  }

  getPaymentStatus(token) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loading.present();
    this.authService.getApiData('payments/'+ token+'/check_status', "", null, this).then((result) => {
      if(result['success']) {
        if(result['payment_invoice']['success']) {
          this.alertService.success(result['message']);
          this.navCtrl.setRoot('StudentsPage');
        } else {
          this.alertService.warning(result['payment_invoice']['message']);
        }
          
        //this.amounts = result['amounts'];
      } else {
        this.alertService.warning(result['message']);
      }
      
      if(this.loading){
        this.loading.dismiss();
      }
    });
  }
  
  goToPaymentHistory() {
    this.navCtrl.push('PaymentHistoryPage');
  } goToApplyCoupon() {
    this.navCtrl.push('ApplyCouponPage');
  }  
}

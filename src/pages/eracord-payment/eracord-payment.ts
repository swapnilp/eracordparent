import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentHistoryPage } from '../payment-history/payment-history';
import { ApplyCouponPage } from '../apply-coupon/apply-coupon';
import { InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';

@Component({
  selector: 'page-eracord-payment',
  templateUrl: 'eracord-payment.html'
})
export class EracordPaymentPage {
  paymentForm: FormGroup;
  browser:any;
  amounts:any = [] ;
  loading: any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams, private inAppBrowser: InAppBrowser, public alertService: AlertService, public loadingController: LoadingController, public authService: AuthService) {
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
      var data = "&amount[eracord_amount_id]=" + params.amount_id;
      this.loading.present();
      
      this.authService.getPostData(data,'payments', true).then((result) => {
        this.loading.dismiss();
        if(result['success']) {
          let token = result['token'];
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
    const url = "https://eracord.com/eracord_payment/"+ token;
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    this.browser = this.inAppBrowser.create(url, '_self', options);
    //this.browser.close();
    this.browser.on('loadstart').subscribe(event => {
      if(event.url.match('mobile/close')) {
        this.browser.close()
        alert('asdasd');
      }
    }, err => {
      console.log("InAppBrowser loadstart Event Error: " + err);
    });
    
    //this.browser.on('exit').subscribe(
    //  () => {
    //    this.alertService.warning("Closed");
    //  },
    //  err => {
    //    console.log("InAppBrowser Loadstop Event Error: " + err);
    //  });
  }

  getPaymentStatus(token) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loading.present();
    this.authService.getApiData('payments/get_status?&token=' + token, "", null, this).then((result) => {
      if(result['success']) {
        //this.amounts = result['amounts'];
      } else {
        
      }
      
      if(this.loading){
        this.loading.dismiss();
      }
    });
  }
  
  
  goToPaymentHistory() {
    this.navCtrl.push(PaymentHistoryPage);
  } goToApplyCoupon() {
    this.navCtrl.push(ApplyCouponPage);
  }  
}

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentHistoryPage } from '../payment-history/payment-history';
import { ApplyCouponPage } from '../apply-coupon/apply-coupon';
import { InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
import { StudentsPage } from '../students/students';

/**
 * Generated class for the StudentPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-student-payment',
  templateUrl: 'student-payment.html',
})
export class StudentPaymentPage {
  paymentForm: FormGroup;
  browser:any;
  amount:any = [] ;
  loading: any;
  studentID:any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams, private inAppBrowser: InAppBrowser, public alertService: AlertService, public loadingController: LoadingController, public authService: AuthService) {
    this.studentID = params.get('studentID');
    this.paymentForm = formBuilder.group({
      amount: ['',  Validators.compose([Validators.required])]
    });
    this.loadAmounts();
  }
  
  loadAmounts() {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loading.present();
    this.authService.getApiData('students/' + this.studentID + '/organisation_payments/new', "", null, this).then((result) => {
      if(result['success']) {
        this.amount = result['amount'];
        this.paymentForm.setValue({amount: this.amount});
      }
      if(this.loading){
        this.loading.dismiss();
      }
    });
  }
  
  payOnline() {
    if(this.paymentForm.valid) {
      this.loading = this.loadingController.create({
        spinner: 'bubbles',
        content: "Please wait..."
      });  
      let params = this.paymentForm.value;
      var data = "&amount[amount]=" + params.amount;
      this.loading.present();
      
      this.authService.getPostData(data,'students/' + this.studentID + '/organisation_payments', true).then((result) => {
        this.loading.dismiss();
        if(result['success']) {
          let token = result['token'];
          let pay_url = result['url'];
          this.payNow(token, pay_url);
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
  
  payNow(token, pay_url) {
    const url = pay_url + token;
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    this.browser = this.inAppBrowser.create(url, '_self', options);
    //this.browser.close();
    this.browser.on('loadstart').subscribe(event => {
      if(event.url.match('mobile/close')) {
        this.browser.close()
        this.getPaymentStatus(token);
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
    this.authService.getApiData('students/' + this.studentID + '/organisation_payments/'+ token+'/check_status', "", null, this).then((result) => {
      if(result['success']) {
        if(result['payment_invoice']['success']) {
          this.alertService.success(result['message']);
          this.navCtrl.setRoot(StudentsPage);
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
    this.navCtrl.push(PaymentHistoryPage);
  } goToApplyCoupon() {
    this.navCtrl.push(ApplyCouponPage);
  }
}

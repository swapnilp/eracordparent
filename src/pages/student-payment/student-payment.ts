import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';

/**
 * Generated class for the StudentPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams, public alertService: AlertService, public loadingController: LoadingController, public authService: AuthService) {
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
  }
}

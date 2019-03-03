import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment-info',
  templateUrl: 'payment-info.html'
})
export class PaymentInfoPage {
  paymentForm: FormGroup;
  browser:any;
  amounts:any = [] ;
  loading: any;
  orderId: any;
  order: any = {};
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              public params: NavParams, public alertService: AlertService,
              public loadingController: LoadingController,
              public authService: AuthService, public events: Events) {
    this.orderId = params.get('orderId');
    this.loadOrder(this.orderId);
    this.paymentForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['',  Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  loadOrder(orderId) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });  
    this.authService.getApiData('payments/' + orderId, {}, null, this).then((result) => {
      if(result['success']){
        this.order = result['order'];
      } else {
        this.alertService.warning(result['message']);
        this.navCtrl.pop({});
      }
      this.loading.dismiss();
    }, () => {
      this.loading.dismiss();
    });
  }

  register() {
    if(this.paymentForm.valid) {
      this.loading = this.loadingController.create({
        spinner: 'bubbles',
        content: "Please wait..."
      });  
      let params = this.paymentForm.value;
      var data = "&payment[name]=" + params.name+ "&payment[email]=" + params.name + "&payment[mobile]=" + params.mobile;
      this.loading.present();
      
      this.authService.getPostData(data,'payments/' + this.orderId +'/info', true).then((result) => {
        this.loading.dismiss();
        if(result['success']) {
          this.payNow(result['order']);
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
  
  payNow(order) {
    let self = this;
    let params = this.paymentForm.value;
    var options = {
      description: order['description'],
      image: order['image'],
      currency: order['currency'],
      key: 'rzp_test_P4Eg01R0yCuFY8',
      order_id: order['order_id'],
      amount: order['amount'],
      name: order['name'],
      prefill: {
        email: params.email,
        contact: params.mobile,
        name: params.name,
      },
      theme: {
        color: order['color']
      }
    }
    
    var successCallback = function(success) {
      self.registerPaymentId(success);
    };
    
    var cancelCallback = function(error) {
      self.cancelOrder(error);
    };

    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options);
  }

  registerPaymentId(data) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });  
    var fromData = "&payment[payment_id]=" + data.razorpay_payment_id + "&payment[order_id]=" + data.razorpay_order_id + "&payment[signature]=" + data.razorpay_signature;
    this.loading.present();

    this.authService.getPostData(fromData,'payments/' + this.orderId +'/capture_payment', true).then((result) => {
      this.loading.dismiss();
      if(result['success']) {
        this.alertService.success(result['messsage']);
        this.events.publish('payment:success', result['payment_priority']);
        this.goToStudent();
      } else {
        this.alertService.warning(result['errors']);
      }
    }, (err) => {
      this.loading.dismiss();
      var msg = JSON.parse(err._body).errors;
      this.alertService.warning(msg);
    });
  }

  cancelOrder(error) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });  
    var fromData = "&payment[error]=" + error.description + "&payment[code]=" + error.code;
    this.loading.present();

    this.authService.getPostData(fromData,'payments/' + this.orderId +'/reject_payment', true).then((result) => {
      this.loading.dismiss();
      if(result['success']) {
        
      } else {
        this.alertService.warning(result['errors']);
      }
    }, (err) => {
      this.loading.dismiss();
      var msg = JSON.parse(err._body).errors;
      this.alertService.warning(msg);
    });
    
    this.alertService.warning(error.description + ' (Error ' + error.code + ')');
    this.navCtrl.pop({});
  }

  goToStudent(){
    this.navCtrl.setRoot('StudentsPage');
  }
}


import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ApplyCouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-coupon',
  templateUrl: 'apply-coupon.html',
})
export class ApplyCouponPage {
  couponForm: FormGroup;
  loading:any;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              public authService: AuthService, public alertService: AlertService,
              public loadingController: LoadingController, public events: Events) {
    this.couponForm = formBuilder.group({
      coupon: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
    });
  }

  applyCouponForm(): void {
    if(this.couponForm.valid) {
      this.loading = this.loadingController.create({
        spinner: 'bubbles',
        content: "Please wait..."
      });  
      let params = this.couponForm.value;
      const user = JSON.parse(localStorage.getItem('userData'));
      if(user) {
        this.loading.present();
        var data = "&parent_payment[coupon]=" + params.coupon;
        this.authService.getPostData(data,'parent_payments/apply_coupon', true).then((result) => {
          this.loading.dismiss();
          if(result['success']) {
            this.alertService.success(result['message']);
            this.events.publish('payment:success', result['payment_priority']);
            this.navCtrl.setRoot('StudentsPage');
          } else {
            this.alertService.warning(result['errors']);
          }
        });
      }
    }
  }
}

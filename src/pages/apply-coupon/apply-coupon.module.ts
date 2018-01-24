import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyCouponPage } from './apply-coupon';

@NgModule({
  declarations: [
    ApplyCouponPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyCouponPage),
  ],
  exports: [
    ApplyCouponPage
  ],
})
export class ApplyCouponPageModule {}

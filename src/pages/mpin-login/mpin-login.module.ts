import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MpinLoginPage } from './mpin-login';

@NgModule({
  declarations: [
    MpinLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(MpinLoginPage),
  ],
  exports: [
    MpinLoginPage
  ],
})
export class MpinLoginPageModule {}

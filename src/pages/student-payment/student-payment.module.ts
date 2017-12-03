import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentPaymentPage } from './student-payment';

@NgModule({
  declarations: [
    StudentPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentPaymentPage),
  ],
})
export class StudentPaymentPageModule {}

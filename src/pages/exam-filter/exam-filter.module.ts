import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamFilterPage } from './exam-filter';

@NgModule({
  declarations: [
    ExamFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamFilterPage),
  ],
  exports: [
    ExamFilterPage
  ],
})
export class ExamFilterPageModule {}

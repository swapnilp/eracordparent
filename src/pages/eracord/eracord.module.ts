import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EracordPage } from './eracord';

@NgModule({
  declarations: [
    EracordPage,
  ],
  imports: [
    IonicPageModule.forChild(EracordPage),
  ],
  exports: [
    EracordPage
  ],
})
export class EracordPageModule {}

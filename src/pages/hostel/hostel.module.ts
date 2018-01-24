import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostelPage } from './hostel';

@NgModule({
  declarations: [
    HostelPage,
  ],
  imports: [
    IonicPageModule.forChild(HostelPage),
  ],
  exports: [
    HostelPage
  ],
})
export class HostelPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewParentPage } from './new-parent';

@NgModule({
  declarations: [
    NewParentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewParentPage),
  ],
  exports: [
    NewParentPage
  ],
})
export class NewParentPageModule {}

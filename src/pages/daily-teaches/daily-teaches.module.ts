import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTeachesPage } from './daily-teaches';

@NgModule({
  declarations: [
    DailyTeachesPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTeachesPage),
  ],
  exports: [
    DailyTeachesPage
  ],
})
export class DailyTeachesPageModule {}

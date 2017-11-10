import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTeachesFilterPage } from './daily-teaches-filter';

@NgModule({
  declarations: [
    DailyTeachesFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTeachesFilterPage),
  ],
})
export class DailyTeachesFilterPageModule {}

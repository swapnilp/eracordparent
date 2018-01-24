import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteStudentPage } from './delete-student';

@NgModule({
  declarations: [
    DeleteStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteStudentPage),
  ],
  exports: [
    DeleteStudentPage
  ],
})
export class DeleteStudentPageModule {}

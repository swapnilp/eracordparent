import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  studentID:any;
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.studentID = params.get('studentID');
  }
  goToExams(params){
    if (!params) params = {};
    this.navCtrl.push('ExamsPage');
  }
  goToDeleteStudent(params){
    if (!params) params = {};
    this.navCtrl.push('DeleteStudentPage', {
      'studentID': this.studentID
    });
  }
  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot('StudentsPage');
  }
}

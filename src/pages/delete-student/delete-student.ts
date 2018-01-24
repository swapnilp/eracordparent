import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';

@IonicPage()
@Component({
  selector: 'page-delete-student',
  templateUrl: 'delete-student.html'
})
export class DeleteStudentPage {
  studentID : any;
  student: any = {};
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController, public alertService: AlertService) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.loadStudent();
  }

  loadStudent() {
    this.authService.getApiData('students/'+ this.studentID, {}, null, this).then((result) => {
      if(result['success']){
        this.student = result['student'];
        if(this.loading) {
          this.loading.dismiss();
        }
      }
    });
  }

  deleteMe() {
    this.authService.getPostData({},'students/' + this.studentID + '/remove_student', true).then((result) => {
      if(result['success']) {
        this.navCtrl.setRoot('StudentsPage', {reload: true});
      } else {
        this.alertService.warning(result['message']);
      }
    }, (err) => {
      var msg = JSON.parse(err._body).errors;
      this.alertService.warning(msg);
    });
  }
  
  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot('StudentsPage');
  }
}

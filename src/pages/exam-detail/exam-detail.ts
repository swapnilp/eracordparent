import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StudentsPage } from '../students/students';

/**
 * Generated class for the ExamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-exam-detail',
  templateUrl: 'exam-detail.html',
})
export class ExamDetailPage {
  studentID : any;
  examID: any;
  exam: any = {};
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.studentID = params.get('studentID');
    this.examID = params.get('examID');
    this.loading.present();
    this.loadExam();
  }

  loadExam() {
    this.authService.getApiData('exam_catlogs/' + this.examID, {}, this.studentID, this).then((result) => {
      if(result['success']){
        this.exam = result['exam'];
      } else {
        
      }
      if(this.loading) {
        this.loading.dismiss();
      }
    });
  }

}

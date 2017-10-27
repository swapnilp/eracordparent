import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-exams',
  templateUrl: 'exams.html'
})
export class ExamsPage {
  studentID : any;
  exams = [];
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.getExams()
  }

  getExams() {
    this.authService.getApiData('exam_catlogs', "", this.studentID).then((result) => {
      this.exams = result['exams'];
      this.loading.dismiss();
    });
  }
  
}

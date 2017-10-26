import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-exams',
  templateUrl: 'exams.html'
})
export class ExamsPage {
  studentID : any;
  exams = [];
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService) {
    this.studentID = params.get('studentID');
    this.getExams()
  }

  getExams() {
    this.authService.getApiData('exam_catlogs', "", this.studentID).then((result) => {
      this.exams = result['exams'];
    });
  }
  
}

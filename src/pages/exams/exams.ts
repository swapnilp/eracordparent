import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StudentsPage } from '../students/students';
import { ExamFilterPage } from '../exam-filter/exam-filter';

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
  page = 2;
  isLoading= false;
  totalCount = 0;
  filter: any= {};
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.filter = params.get('filter');
    this.getExams(1);
  }

  getExams(page, scroll = null) {
    this.isLoading = true;
    this.authService.getApiData('exam_catlogs', {page: page}, this.studentID, this).then((result) => {
      this.totalCount = result['total_count'];
      if(result['exams']){
        if(result['exams'].length == 0 && scroll) {
          scroll.enable(false);
        }
        for(let exam of result['exams']) {
          setTimeout(() => {
            this.exams.push(exam);
          }, 500);

        }
        if(this.loading) {
          this.loading.dismiss();
        }
        this.isLoading = false;
        if(scroll){ 
          scroll.complete();
        }
      }
    });
  }
  
  doInfinite(infiniteScroll) {
    if(!this.isLoading) {
      this.getExams(this.page, infiniteScroll);
      this.page++;
    }
  }

  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StudentsPage);
  }

  filterExams() {
    this.navCtrl.push(ExamFilterPage);
  }
  
}

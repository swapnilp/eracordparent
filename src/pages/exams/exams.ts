import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StudentsPage } from '../students/students';

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
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.getExams(1);
  }

  getExams(page, scroll = null) {
    this.isLoading = true;
    this.authService.getApiData('exam_catlogs', {page: page}, this.studentID, this).then((result) => {
      if(result['exams']){
        if(result['exams'].length == 0 && scroll) {
          scroll.enable(false);
        }
        for(let exam of result['exams']) {
          this.exams.push(exam);
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
  
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ExamsPage } from '../exams/exams';
import { AuthService } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ExamFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam-filter',
  templateUrl: 'exam-filter.html',
})
export class ExamFilterPage {
  studentID:any;
  filterData: any = {};
  loading:any;
  subjects:any= [];
  
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loading.present();
    this.studentID = params.get('studentID');
    if(params.get('filter')) {
      this.filterData = params.get('filter');
    }
    if(this.filterData.subjects === undefined) {
      this.filterData.subjects = [];
    } else if(typeof(this.filterData.subjects) === "string"){
      let subjects = this.filterData.subjects.split(',').map(Number);
      if(subjects == 0) {
        this.filterData.subjects = [];
      } else {
        this.filterData.subjects = subjects;
      }
    } 

    if(this.filterData.absentee === undefined) {
      this.filterData.absentee = "all";
    }
    if(this.filterData.examType === undefined) {
      this.filterData.examType = "all";
    }

    if(this.filterData.startDate === undefined) {
      this.filterData.startDate = "";
    }
    if(this.filterData.endDate === undefined) {
      this.filterData.endDate = "";
    }
    this.getFilterData();
  }

  getFilterData() {
    this.authService.getApiData('exam_catlogs/filter_data', {}, this.studentID, this).then((result) => {
      if(result['subjects']){
        for(let subject of result['subjects']) {
          this.subjects.push(subject);
        }
      }
      if(this.loading) {
        this.loading.dismiss();
      }
    });
  }

  apply() {
    let hasFilter = !(this.filterData.subjects.length == 0 && this.filterData.startDate == '' && this.filterData.endDate == '' && this.filterData.absentee === 'all' && this.filterData.examType === 'all');
    if(this.filterData.startDate === "") {
      delete(this.filterData.startDate);
    }
    if(this.filterData.endDate === "") {
      delete(this.filterData.endDate);
    }
    this.filterData.subjects = this.filterData.subjects.join(',');
    this.navCtrl.setRoot(ExamsPage, {
      'studentID': this.studentID,
      'filter': this.filterData,
      'hasFiltered': hasFilter
    });
  }

  back() {
    this.apply();
  }
  
  clear() {
    this.filterData = {};
    this.filterData.subjects = [];
    this.filterData.startDate = "";
    this.filterData.endDate = "";
    this.filterData.absentee = "all";
    this.filterData.examType = "all";
  }

  isBlankSort() {
    this.filterData.subjects.length == 0 && this.filterData.startDate == "" && this.filterData.endDate == ""
  }

  checkSubject(self, subjectId) {
    if(this.filterData.subjects.includes(subjectId)) {
      let index = this.filterData.subjects.indexOf(subjectId);
      this.filterData.subjects.splice(index,1);
    } else {
      this.filterData.subjects.push(subjectId);
    }
  }

}

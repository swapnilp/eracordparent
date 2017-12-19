import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
import { StudentsPage } from '../students/students';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  feedbackForm: FormGroup;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingController: LoadingController, public authService: AuthService, public alertService: AlertService) {
    this.feedbackForm = formBuilder.group({
      subject: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      text: ['', Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }

  registerFeedback() {
    if(this.feedbackForm.valid) {
      this.loading = this.loadingController.create({
        spinner: 'bubbles',
        content: "Please wait..."
      });  
      let params = this.feedbackForm.value;
      if(params.mobile !== params.confirmMobile) {
        this.alertService.warning("Confirm Mobile does not match!!");
        return true;
      }
      var data = "&register_feedback[mobile]=" + localStorage.getItem('mobile') + "&register_feedback[subject]=" + params.subject + "&register_feedback[text]=" + params.text;
      this.loading.present();
      this.authService.getPostData(data,'register_feedback').then((result) => {
        this.loading.dismiss();
        let payment = localStorage.getItem('paymentPriority');
        this.navCtrl.setRoot(StudentsPage, {payment: payment});
        this.alertService.warning(result['message']);
      }, (err) => {
        this.loading.dismiss();
        var msg = JSON.parse(err._body).errors;
        this.alertService.warning(msg);
      });
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertService } from '../../providers/alert-service/alert-service';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  feedbackForm: FormGroup;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingController: LoadingController, public authService: AuthService, public alertService: AlertService) {
    this.feedbackForm = formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
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
      debugger
      var data = "&register_feedback[mobile]=" + localStorage.getItem('mobile') + "&register_feedback[title]=" + params.title + "&register_feedback[message]=" + params.message;
      this.loading.present();
      this.authService.getPostData(data,'register_feedback').then((result) => {
        this.loading.dismiss();
        let payment = localStorage.getItem('paymentPriority');
        this.navCtrl.setRoot('StudentsPage', {payment: payment});
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

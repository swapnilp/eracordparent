import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//let apiUrl = 'http://localhost:3000/parents/';
//let apiUrl = 'https://eracord.com/parents/';
//let serverUrl = 'https://eracord.com/api/v1/parents/';
let apiUrl = 'http://0.0.0.0:3000/parents/';
let serverUrl = 'http://0.0.0.0:3000/api/v1/parents/';

@Injectable()
export class AuthService {

  constructor(public http: Http, public events: Events) {
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(apiUrl + type+ ".json" , credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  getPostData(credentials, type, auth = false) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let req_params = "";
      if (auth) {
        const user = JSON.parse(localStorage.getItem('userData'));
        headers.append('Authorization', user.token);
      }
      this.http.post(serverUrl + type+ ".json?" + req_params , credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  getApiData(url, params, student_id = null, pageObj) {
    let self = this;
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('userData'));
      let headers = new Headers();
      if(user) {
        headers.append('Authorization', user.token);
        let req_params = "";

        if(student_id) {
          req_params  = req_params  + "&student_id=" + student_id;
        }

        let paramsKeys = Object.keys(params);
        for(let key of paramsKeys) {
          req_params  = req_params +"&"+ key + "=" +params[key]
        }
        if(pageObj.filter) {
          req_params  = req_params + this.objToStr(pageObj.filter, undefined);
        }
        this.http.get(serverUrl + url+ ".json?" + req_params, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            localStorage.setItem('userData', null);
            if(url !== 'hostels' && pageObj.loading) {

              pageObj.loading.dismiss();
            }
            self.events.publish('user:unauth', "Swapnil Patil");
            resolve(err.json());
          });
      }else {
        reject({});
      }
    });
  }

  getApiDataWithoutUser(url, params, pageObj) {
    let self = this;
    return new Promise((resolve, reject) => {
      let req_params = "?";
      let paramsKeys = Object.keys(params);
      for(let key of paramsKeys) {
        req_params  = req_params +"&"+ key + "=" +params[key]
      }
      this.http.get(serverUrl + url+ ".json" + req_params)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          localStorage.setItem('userData', null);
          self.events.publish('user:unauth', "Swapnil Patil");
          resolve(err.json());
        });
    });
  }

  objToStr(obj, parent) {
    let keys = Object.keys(obj);
    let str = "";
    for(let key of keys) {
      if(typeof(obj[key]) == 'object'){
        let paramKey = "";
        if(parent) {
          paramKey = parent + "["+key+"]";
        } else {
          paramKey = key;
        }
        str = str + this.objToStr(obj[key], paramKey);
      }else{
        if(parent) {
          str  = str + "&"+ parent+ "[" + key + "]";
        } else {
          str  = str +"&"+ key;
        }
        str = str + "=" +obj[key];
      }
    }
    return str;
  }

}

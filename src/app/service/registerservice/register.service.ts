import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { CommoncallService } from '../commoncall/commoncall.service';




@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,
    private apiCall: CommoncallService) { }

  signup(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequest(data, "user/signUp").subscribe(res => {
        resolve(res)
      }, error => {
        if (error.status == 403) reject('Email id Exist')
        else if (error.status == 400) reject('Bad request')
        else if (error.status == 500) reject('Something went wrong')
      })
    })
  }
  securityQuestions() {
    // // return new Promise((resolve, reject) => {
    // //   this.apiCall.getRequest("sq/getSecurityQuestion").subscribe(res => {
    // //     resolve(res)
    // //   }, error => {
    // //     reject('Something went wrong')
    // //   })
    // // })
  }
}


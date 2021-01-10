import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { CommoncallService } from '../commoncall/commoncall.service'


@Injectable({
  providedIn: 'root'
})
export class ResendMailService {

  constructor(private http: HttpClient,
    private apiCall: CommoncallService) { }

  resendMail(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequest(data, 'user/resendMail_for_verify_email').subscribe(res => {
        resolve(res)
      }, error => {
        if (error.status == 400) reject('Something went wrong');
        else if (error.status == 462) reject('Please try After few min');
      })
    })
  }
  resendMailIP(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequest(data, 'user/resendMail_for_verify_IP').subscribe(res => {
        resolve(res)
      }, error => {
        if (error.status == 400) reject('Something went wrong');
        else if (error.status == 462) reject('Please try After few min');
      })
    })
  }
  mailconfirmation(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.getRequest(data).subscribe(res => {
        resolve(res)
        console.log('>>>>@@@@.....',res)
//         code	500
// message	JsonWebTokenError
      }, error => {
        
        if (error.status == 400) reject('Something went wrong');
        else if (error.status == 406) reject('Email Already verified');
        else if (error.status == 401) reject('IP Already Authorized');
        else if(error.status==500) reject('Something went wrong')
      })
    })
  }
}
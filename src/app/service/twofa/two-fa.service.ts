import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { CommonService } from '../../service/commonservice/common.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TwoFaService {

  constructor(private http: HttpClient,
    private apiCall: CommoncallService,
    private router: Router,
    private setLocalStoreage: CommonService,
    private toastr: ToastrService) { }

  twoFaValidate(data, serviceType) {
    if (serviceType == "changePassword") {
      return new Promise((resolve, reject) => {
        this.apiCall.putRequestHeader(data, "user/changePassword", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve('Password Changed Successfully')
        }, error => {
          if (error.status == 481 || error.status == 480) reject("Invalid OTP")
          else if (error.status == 404) reject("Invalid Password")
          else if (error.status == 406) reject("New Password not matching with confirm password")
          else if (error.status == 403) reject("Use other password")
        })
      })
    }
   else if (serviceType == "antiPhishing") {
      return new Promise((resolve, reject) => {
        this.apiCall.postRequestHeader(data, "user/enableAntiFishing", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve('Anti-Phishing enabled')
        }, error => {
          if (error.status == 481 || error.status == 480) reject("Invalid OTP")
           else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
    else if (serviceType == "antiPhishingUpdate") {
      return new Promise((resolve, reject) => {
        this.apiCall.postRequestHeader(data, "user/enableAntiFishing", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve('Anti-Phishing Code Updated')
        }, error => {
          if (error.status == 481 || error.status == 480) reject("Invalid OTP")
          else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
    else if (serviceType == "secondPassword") {
      return new Promise((resolve, reject) => {
        this.apiCall.postRequestHeader(data, "user/secondPassword", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve(' Transaction Password Enabled')
        }, error => {
            if (error.status == 481 || error.status == 480) reject("Invalid OTP")
          else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
    else if (serviceType == "secondPasswordDisable") {
      return new Promise((resolve, reject) => {
        this.apiCall.putRequestHeader(data, "user/disableSecondPassword", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve(' Transaction Password Disable')
        }, error => {
           if (error.status == 481 || error.status == 480) reject("Invalid OTP")
           if(error.status==404) reject("Invalid Password");
          else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
    else if (serviceType == "secondPasswordChange") {
      return new Promise((resolve, reject) => {
        this.apiCall.putRequestHeader(data, "user/changeSecondPassword", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve(' Transaction Password Updated')
        }, error => {
          if (error.status == 404) reject("Invalid Password")
          else if (error.status == 481 || error.status == 480) reject("Invalid OTP")
          else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
    else if (serviceType == "secondPasswordForgot") {
      return new Promise((resolve, reject) => {
        this.apiCall.postRequestHeader(data, "user/forgotSecondPassword", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve(' Transaction Password Reset Successfully')
        }, error => {
          if (error.status == 404) reject("Invalid Password")
          else if (error.status == 481 || error.status == 480) reject("Invalid OTP")
          else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
    else if (serviceType == "securityQuestions") {
      console.log('data>>>>>>',data)
      return new Promise((resolve, reject) => {
        this.apiCall.putRequestHeader(data, "sq/securityQuestionUpdate", this.setLocalStoreage.getlocalData()['token']).subscribe(res => {
          resolve('Security Questions Updated')
        }, error => {
          if (error.status == 481 || error.status == 480) reject("Invalid OTP")
          else if (error.status == 500) reject("Something went wrong")
        })
      })
    }
  }


}

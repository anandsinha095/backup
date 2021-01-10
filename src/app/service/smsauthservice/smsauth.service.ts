import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { CommonService } from '../../service/commonservice/common.service'
import { CommoncallService } from '../../service/commoncall/commoncall.service';


@Injectable({
  providedIn: 'root'
})
export class SmsauthService {


  id: any = [];
  sourceData: any = [];
  auth: any;
  constructor(private http: HttpClient,
    private localData: CommonService,
    private apiCall: CommoncallService,
  ) { }
  smsauthentication(data) {
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequestHeader(data, "otp/sendOtpToEnableSmsAuth",this.localData.getlocalData()['token']).subscribe(res=>{
      resolve(res);
      },error=>{
        if(error.status==400) reject("");
        if(error.status==481) reject("Invalid OTP");
        if(error.status==404) reject("Invalid Password");
      })
    })
  }
  smsVerify(data) {
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequestHeader(data, "otp/verifyOtpToEnableSmsAuth",this.localData.getlocalData()['token']).subscribe(res=>{
      resolve(res);
      },error=>{
        if(error.status==400) reject("");
        if(error.status==480) reject("Invalid OTP");
        if(error.status==481) reject("Invalid OTP");
      })
    })
  }
  smsVerifyOtp(data) {
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequestHeader(data, "otp/verifyOtp",this.localData.getlocalData()['token']).subscribe(res=>{
      resolve(res);
      },error=>{
        if(error.status==400) reject("");
        if(error.status==480) reject("Invalid OTP");
        if(error.status==481) reject("Invalid OTP");
      })
    })
  }
  smsAuthVerify(data, header) {
    console.log('testing data otp >>>>', data)
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader(data, "otp/sendOtpToEnableSmsAuth", header).subscribe(res => {
      resolve(res);
      }, error => {
        if (error.status == 410) reject("Invalid OTP")
        else if (error.status == 470) reject("OTP Expired ")
      })
    });
  }
  /* while login  */
  smsAuthVerifyLogin(data, header) {
    console.log('testing data otp >>>>', data)
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader(data, "user/save_LoginLog_If_TwoFA_Enable", header).subscribe(res => {
      resolve(res);
      }, error => {
        if (error.status == 410) reject("Invalid OTP")
        else if (error.status == 470) reject("OTP Expired ")
      })
    });
  }
  resendSmsAuth(data, header) {
    console.log('resend data>>>>>>> ', data)
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader({ user_id: data }, "otp/sendOtp", header).subscribe(res => {
       resolve(res)
      }, error => {
       reject(error)
      });
    })
  }

  smsAuthDisableVerify(data) {
    console.log('diabe data>>>>>>> ', data)
    return new Promise((resolve, reject) => {
      this.apiCall.putRequestHeader(data, "otp/disableSmsAuth", this.localData.getlocalData()['token']).subscribe(res => {
       resolve(res)
      }, error => {
        if (error.status == 404) reject("Invalid OTP")
        else if (error.status == 480) reject("Invalid OTP")
        else if (error.status == 500) reject("Invalid OTP")
      });
    })
  }
  resendSMS(data,header) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader({ user_id: data }, "otp/sendOtp", header).subscribe(res => {
        return resolve(res);
      }, error => {
        return reject(error)
      });
    })
  }
}

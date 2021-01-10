import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../service/loginservice/login.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from '../../service/commonservice/common.service'
import { GauthService } from '../../service/gauthservice/gauth.service';
import { SmsauthService } from '../../service/smsauthservice/smsauth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {


  verifyForm: FormGroup;
  submitted = false;
  otp: AbstractControl;
  authStatus: any
  mainData:any;
  userId:any
  token:any;
  constructor(
    private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginData: LoginService,
    private setlocaldata: CommonService,
    private gAuth: GauthService,
    private smsAuth: SmsauthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    if (this.loginData.service == undefined) return this.router.navigate(['/login']);
    this.verifyForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.authStatus = this.route.snapshot.paramMap.get('auth');
    this.mainData=this.loginData.service
    this.userId=this.loginData.service.data._id;
    this.token=this.loginData.service.data.jwt;
  }
  async otpSubmit() {
    this.submitted = true;
    if (this.verifyForm.invalid) return
    else if (this.authStatus == false) {
      let otpVerify = { user_id: this.loginData.service.data._id, otp: this.verifyForm.value.otp,  password:"@@@@123456748#$%"}
      try {
        await this.gAuth.gauthVerifyOtp(otpVerify, this.loginData.service.data.jwt)
        this.loggedIn()
        return
      }
      catch (e) {
        this.toastr.error(e, "Oops!")
      }
    }
    else if (this.authStatus == true) {
      let smsVerify = { user_id: this.loginData.service.data._id, otp: this.verifyForm.value.otp, password:"@@@@123456748#$%"}
      try {
        await this.smsAuth.smsAuthVerifyLogin(smsVerify, this.loginData.service.data.jwt)
        this.loggedIn()
        return
      }
      catch (e) {
        this.toastr.error(e, "Oops!")
      }
    }
  }
  async  resendSmsAgain() {
    try {
 console.log('>>>>>>>>>>>>>>>',this.userId)
      await  this.smsAuth.resendSmsAuth(this.userId, this.token)
      this.toastr.success('OTP sent','')
    }
    catch(e){
      this.toastr.error(e,'Opps!')
    }
  }
  loggedIn() {
    this.setlocaldata.setLocalData(this.loginData.service)
    this.toastr.success("Welcome to Cypherchange", "login successfully")
    return this.router.navigate(['/account/'])
  }
  onKey(event: any) {
    if (event.target.value.length == 6) {
      this.otpSubmit();
    }
  }

}

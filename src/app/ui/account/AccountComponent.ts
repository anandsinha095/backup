import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { GauthService } from '../../service/gauthservice/gauth.service';
import { SmsauthService } from '../../service/smsauthservice/smsauth.service';
import { ForgotserviceService } from '../../service/forgotservice/forgotservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../service/commonservice/common.service'
import { AntiphishingService } from '../../service/antiphishingservice/antiphishing.service'
//import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CountrydataService } from '../../service/countrydata/countrydata.service';
import { LoginhistoryService } from '../../service/loginhistory/loginhistory.service'
import { TwoFaService } from '../../service/twofa/two-fa.service'
import { SecurityQuestionService } from '../../service/securityquestion/security-question.service'
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('frame1') frame1: ModalDirective;
  @ViewChild('frameSms') frameSms: ModalDirective;
  @ViewChild('frameKyc') frameKyc: ModalDirective;
  @ViewChild('twoFaWarning') twoFaWarning: ModalDirective;
  @ViewChild('gauthDis') gauthDis: ModalDirective;
  @ViewChild('smsDis') smsDis: ModalDirective;
  @ViewChild('framex') framex: ModalDirective;
  @ViewChild('frameAnti') frameAnti: ModalDirective;
  @ViewChild('twoFaModal') twoFamodal: ModalDirective;
  @ViewChild('frameSecPsw') frameSecPsw: ModalDirective;
  @ViewChild('frameSecPswDisable') frameSecPswDisable: ModalDirective;
  @ViewChild('frameSecPswChange') frameSecPswChange: ModalDirective;
  @ViewChild('frameSecurityQuestion') frameSecurityQuestion: ModalDirective;
  @ViewChild('frameSecondPasswordForgot') frameSecondPasswordForgot: ModalDirective;
  data: any = [];
  qr: any;
  qrKey: any;
  imagePath: any;
  localStoreData: any;
  id: any = [];
  sourceData: any = [];
  obj: any = [];
  objVerify: any = [];
  authorization: any;
  gauthForm: FormGroup;
  submitted = false;
  gauthDisableForm: FormGroup;
  objGauthDisable: any = [];
  gauthDisablesubmitted = false;

  smsForm: FormGroup;
  smsVerifyForm: FormGroup;
  submitSms: any;
  submitSmsVerify = false;

  smsDisableForm: FormGroup;
  smsDisableVerifyForm: FormGroup;
  smsDisableVerifysubmitted = false;
  smsDisablesubmitted = false;
  checkDisableSms = false;
  smsobj: any = [];
  smsobjverify: any = [];
  smsDetails = true;
  checked: any;
  checkedsms: any;

  /* change password */
  changePasswordForm: FormGroup;
  submitted2 = false;

  /* security question  */
  securityQuestionForm: FormGroup
  securityQuesAsk: any;
  securityQuesAns: any;
  securityStatus: any;
  /* change question  */
  quesOne: any;
  quesTwo: any;
  quesThree: any;
  questions: any = [];
  question1: any = [];
  question2: any = [];
  question3: any = [];
  allData: any;
  allData2: any;
  merged: any;
  firstList: any = [];
  secondList: any = [];
  thirdList: any = [];
  selectedLevel: any;
  securityQA: Array<any>;
  securityQuestionSelectForm: FormGroup;
  q1: any = "";
  q2: any = "";
  q3: any = "";
  a1: any = "";
  a2: string;
  a3: string;

  /** Ani-Phishing**/
  antiPhishingForm: FormGroup;
  submittedx = false;
  antiPhishingStatus;


  /*** second password ***/
  secondPasswordForm: FormGroup;
  submittedx1 = false;
  secondPasswordStatus;
  secondPasswordDisableForm: FormGroup;
  submittedx2 = false;
  secondPasswordChangeForm: FormGroup;

  /* user info  */
  userInfo: any = [];
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: any;
  userEmail: any;
  /* 2fa  */
  submittedOtp = false;
  twoFaSubmit = false;
  twoFaForm: FormGroup;
  arr: any = []
  reqData: any
  finalData: any
  serviceType: string;
  authType = false;

  /* login history */
  loginHistory: any = []
  deviceHistory: any
  deviceActivity: any = []

  /* secon password Forgot */
  secondPasswordForgotForm: FormGroup
  /****** KYC  ******/
  kycStatusApply: any
  userKycStatus: Boolean;
  userKycAttampt: any;

  constructor(private gAuth: GauthService,
    // private crypt: EncryptService,
    private smsauthentication: SmsauthService,
    private base64img: DomSanitizer,
    private formBuilder: FormBuilder,
    private localData: CommonService,
    private antiPhishingData: AntiphishingService,
    private changePasssword: ForgotserviceService,
    private countrycode: CountrydataService,
    private toastr: ToastrService,
    private loginHistoryData: LoginhistoryService,
    private securityQuestionData: SecurityQuestionService,
    private apiCall: CommoncallService,
    private twoFaAuth: TwoFaService,
    private router: Router
  ) { }

  ngOnInit() {
    /* scroll to top */
    window.scrollTo(0, 0)
    /* Checking token is available or not */
    this.localData.checkLogin()
    /* feching localstorage data  */
    this.localApiData()
    /************* login history  ***********/
    this.userLoginHistory()
    /************* Device management ********************* */
    this.userDeviceHistory()
    /*********  user 2Fa status  *************** */
    this.userTwoFAStatus();

    this.gauthForm = this.formBuilder.group({
      gauthCode: ['', [Validators.required, Validators.maxLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });

    /* gauth Disable*/
    this.gauthDisableForm = this.formBuilder.group({
      gauthOtp: ['', [Validators.required, Validators.maxLength(6)]],
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
    /* SMS auth */
    if (this.localStoreData['smsAuth'] == "true" && this.localStoreData['gauth'] == "false") {
      this.checkedsms = true;
    }
    this.smsForm = this.formBuilder.group({
      loginPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      countryCode: ['', [Validators.required]],
    });
    this.smsVerifyForm = this.formBuilder.group({
      smsOTP: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    });
    /* SMS Disable */
    this.smsDisableForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      contactNumber: ['', [Validators.required]],

    });
    this.smsDisableVerifyForm = this.formBuilder.group({
      smsDisableOtp: ['', [Validators.required, , Validators.maxLength(6)]],
    });
    /* change password */
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword') });
    /** Security Question  **/
    this.securityQuestionForm = this.formBuilder.group({
      securityQuesAnswer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    });
    this.securityQuestionSelectForm = this.formBuilder.group({
      quesOne: ['', [Validators.required]],
      ansOne: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2)]],
      quesTwo: ['', [Validators.required]],
      ansTwo: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2)]],
      quesThree: ['', Validators.required],
      ansThree: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2)]],
    })
    /** Ani-Phishing**/
    this.antiPhishingForm = this.formBuilder.group({
      antiCode: ['', [Validators.required, , Validators.minLength(8), Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(16)]]
    });

    /* Second password */
    this.secondPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
    }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword') });

    /* Second password Disable*/
    this.secondPasswordDisableForm = this.formBuilder.group({
      newPasswordDisable: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), , Validators.pattern('^[0-9]*$')]],
    });
    /* change second password */
    this.secondPasswordChangeForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), , Validators.pattern('^[0-9]*$')]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
    }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword') });
    /* Forgot second password */
    this.secondPasswordForgotForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
    }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword') });
    /* 2FA Auth  */
    this.twoFaForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngAfterViewInit() {
    if (this.localStoreData['smsAuth'] == "false" && this.localStoreData['gauth'] == "false") this.twoFaWarning.show()
  }
  /* Checking password and confirm matching statusss  */
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInputData = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordConfirmationInput.value == null) {
        return passwordConfirmationInput.setErrors({ required: true });
      }
      else if (passwordInputData.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
    };
  }
  /* Local API data */
  localApiData() {
    this.localStoreData = this.localData.getlocalData();
    console.log('testing all data ', this.localData.getlocalData())

    /* checking anti-phishing status  */
    this.antiPhishingStatus = this.localStoreData['antiPhishing'];
    if (this.localStoreData['antiPhishing'] == "false") this.antiPhishingStatus = false;
    else if (this.localStoreData['antiPhishing'] == "true") this.antiPhishingStatus = true;

    /* checking tx password status */
    if (this.localStoreData['secondPassword'] == "false") this.secondPasswordStatus = false;
    else if (this.localStoreData['secondPassword'] == "true") this.secondPasswordStatus = true;

    /* fetching all required data from userinfo Api  */
    this.localData.userInfo(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
      this.userFirstName = res['data']['firstName']
      this.userLastName = res['data']['lastName']
      this.userPhoneNumber = res['data']['mobile']
      this.userEmail = res['data']['email']

      /* checking KYC status */
      if (res['data']['kycIndividualPopulate'] != undefined && res['data']['kycIndividualPopulate']['resubmission'] == false && (res['data']['kycIndividualPopulate']['fullKycStatus'] == "COMPLETE")) this.kycStatusApply = 4
      else if (res['data']['kycCorporatePopulate'] != undefined && res['data']['kycCorporatePopulate']['resubmission'] == false && (res['data']['kycCorporatePopulate']['fullKycStatus'] == "COMPLETE")) this.kycStatusApply = 4
      if (res['data']['kycIndividualPopulate'] != undefined && res['data']['kycIndividualPopulate']['resubmission'] == false && (res['data']['kycIndividualPopulate']['fullKycStatus'] == "REJECT")) this.kycStatusApply = 3
      else if (res['data']['kycCorporatePopulate'] != undefined && res['data']['kycCorporatePopulate']['resubmission'] == false && (res['data']['kycCorporatePopulate']['fullKycStatus'] == "REJECT")) this.kycStatusApply = 3
      else this.kycStatusApply = 1
    }, error => {
      console.log(error.status)
    })
  }

  /* User Login History */
  userLoginHistory() {
    this.loginHistoryData.userLoginDetails(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
      let logHistory = res['data'];
      let count = 1;
      logHistory.forEach(element => {
        if (count <= 5) {
          this.loginHistory.push(
            {
              "createdAt": element.createdAt.toString().replace('T', ' ').replace('Z', ''),
              "loginIP": element.loginIP,
              "locationCity": element.locationCity,
            })
        }
      });
    }, error => {
      console.log(error.status)
    })
  }

  /* user device history */
  userDeviceHistory() {
    this.loginHistoryData.userDeviceDetails(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
      let devHistory = res['data']
      //  console.log('count>>>>>>>',this.deviceHistory)
      let count = 1
      devHistory.forEach(element => {
        let activity = element.info
        activity.forEach(ele => {
          if (count <= 5) {
            this.deviceActivity.push({
              "createdAt": ele.createdAt.toString().replace('T', ' ').replace('Z', ''),
              "loginIP": ele.loginIP,
              "browserVersion": ele.browserVersion,
              "os": ele.os,
              "browser": ele.browser,
            })
          }
          count++;
        });
      });
    }, error => {
      console.log(error.status)
    })
  }
  /* user 2FA status */
  userTwoFAStatus() {
    /* User email and id in object for maltiple time required  */
    this.obj = { email_id: this.localStoreData['userMail'], user_id: this.localStoreData['userId'] }
    /* gauth  validation */
    if (this.localStoreData['smsAuth'] == "false" && this.localStoreData['gauth'] == "false") {
      this.checked = false;
      this.checkedsms = false;
    }
    if (this.localStoreData['smsAuth'] == "false" && this.localStoreData['gauth'] == "true") this.checked = true;
  }
  /* Kyc checking  */
  async kycActiveStatus() {
    if (this.localData.getlocalData()['gauth'] === "true" || this.localData.getlocalData()['smsAuth'] === "true") {
      await this.localData.userInfo(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
        if (res['data']['kycIndividualPopulate'] != undefined) {
          if (res['data']['kycIndividualPopulate']['resubmission'] == false && (res['data']['kycIndividualPopulate']['fullKycStatus'] == "PENDING")) {
            this.kycStatusApply = 2;
            this.frameKyc.show();
          }
          else if (res['data']['kycIndividualPopulate']['resubmission'] == false && (res['data']['kycIndividualPopulate']['fullKycStatus'] == "REJECT")) {
            this.kycStatusApply = 3;
            this.frameKyc.show();
          }
          else if (res['data']['kycIndividualPopulate']['resubmission'] == false && (res['data']['kycIndividualPopulate']['fullKycStatus'] == "COMPLETE")) {
            this.kycStatusApply = 4;
            this.frameKyc.show();
          }
          else if (res['data']['kycIndividualPopulate']['resubmission'] == true) {
            this.router.navigate(["account/kycresubmit"])
          }
        }
        else if (res['data']['kycCorporatePopulate'] != undefined) {
          if (res['data']['kycCorporatePopulate']['resubmission'] == false && (res['data']['kycCorporatePopulate']['fullKycStatus'] == "PENDING")) {
            this.kycStatusApply = 2;
            this.frameKyc.show();
          }
          else if (res['data']['kycCorporatePopulate']['resubmission'] == false && (res['data']['kycCorporatePopulate']['fullKycStatus'] == "REJECT")) {
            this.kycStatusApply = 3;
            this.frameKyc.show();
          }
          else if (res['data']['kycCorporatePopulate']['resubmission'] == false && (res['data']['kycCorporatePopulate']['fullKycStatus'] == "COMPLETE")) {
            this.kycStatusApply = 4;
            this.frameKyc.show();
          }
          else if (res['data']['kycCorporatePopulate']['resubmission'] == true) {
            this.router.navigate(["account/kyccorporateresubmit"])
          }
        }
        else {
          this.kycStatusApply = 1
          this.frameKyc.show()
        }
      });
    }
    else this.toastr.warning('Enable 2FA for before do the KYC', 'Note')
  }
  /* warning authentication function */
  async googleAuth() {
    this.gauthForm.reset();
    this.twoFaWarning.hide()
    try {
      let qrCode = await this.gAuth.gauth(this.obj, this.localStoreData['token'])
      this.qr = qrCode['data']['qr'];
      this.qrKey = qrCode['data']['secret'];
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
    this.frame1.show();
  }
  smsAuth() {
    this.smsForm.reset();
    this.twoFaWarning.hide()
    this.frameSms.show();
    this.countrycode.country.forEach(element => {
      this.arr.push(element.dial_code)
    });
  }
  /* google authentication  */
  async gauthentication(event) {
    this.gauthForm.reset();
    this.localStoreData = this.localData.getlocalData();
    if (this.localStoreData['smsAuth'] == "false" && this.localStoreData['gauth'] == "false") {
      this.frame1.show();
      event.target.checked = false;
      try {
        let qrCode = await this.gAuth.gauth(this.obj, this.localStoreData['token'])
        this.qr = qrCode['data']['qr'];
        this.qrKey = qrCode['data']['secret'];
      }
      catch (e) {
        this.toastr.error(e, 'Opps!')
      }
    }
    else if (this.localStoreData['smsAuth'] == "false" && this.localStoreData['gauth'] == "true") {
      this.gauthDisableForm.reset();
      this.gauthDis.show();
      this.localStoreData = this.localData.getlocalData();
      event.target.checked = true;
    }
    else {
      event.target.checked = false;
      this.toastr.warning('SMS Auth Already enabled', 'Warning')
    }
  }
  async gauthSubmit() {
    this.submitted = true;
    if (this.gauthForm.invalid) return;
    this.objVerify = { user_id: this.obj.user_id, token: this.gauthForm.value.gauthCode, password: this.gauthForm.value.password }
    try {
      await this.gAuth.gauthVerify(this.objVerify, this.localStoreData['token'])
      this.checked = true;
      localStorage.setItem('gauth', "true")
      this.frame1.hide();
      this.toastr.success('GAUTH Authentication Enabled', 'Great!')
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
  }

  onKey(event: any, status2Fa) {
    if (status2Fa == 'gauthEnable') {
      if (event.target.value.length == 6) {
        this.gauthSubmit();
      }
    }
    else if (status2Fa == 'gauthDisable') {
      if (event.target.value.length == 6) {
        this.gauthDisableSubmit();
      }
    }
    else if (status2Fa == 'smsEnable') {
      if (event.target.value.length == 6) {
        this.smsVerifySubmit();
      }
    }
    else if (status2Fa == 'smsDisable') {
      if (event.target.value.length == 6) {
        this.smsDisableVerifySubmit();
      }
    }
  }

  /********************************** disable Gauth *******************************************/

  async gauthDisableSubmit() {
    this.gauthDisablesubmitted = true;
    if (this.gauthDisableForm.invalid) return;
    this.objGauthDisable = { user_id: this.obj.user_id, otp: this.gauthDisableForm.value.gauthOtp, password: this.gauthDisableForm.value.oldPassword }
    try {
      await this.gAuth.gauthDisable(this.objGauthDisable, this.localStoreData['token'])
      this.checked = false;
      localStorage.setItem('gauth', "false")
      this.gauthDis.hide();
      this.toastr.success('GAUTH Authentication disabled', 'Security Concern')
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
  }
  /********************************SMS Authentication ***************************************/

  smsauth(event) {
    this.smsForm.reset();
    this.smsDetails = true
    this.localStoreData = this.localData.getlocalData();
    if (this.localStoreData['smsAuth'] == "false" && this.localStoreData['gauth'] == "false") {
      this.frameSms.show();
      event.target.checked = false;
      this.countrycode.country.forEach(element => {
        this.arr.push(element.dial_code)
      });
    }
    else if (this.localStoreData['smsAuth'] == "true" && this.localStoreData['gauth'] == "false") {
      this.localData.userInfo(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
        this.userInfo = res;
        this.userPhoneNumber = this.userInfo.data.mobile;
      });
      this.smsDisableForm.reset()
      this.smsDis.show();
      this.checkDisableSms = false
      event.target.checked = true;
      this.smsDisableForm.patchValue({
        contactNumber: this.userPhoneNumber
      });
    }
    else {
      event.target.checked = false;
      this.toastr.warning('GAuth Already  enabled', 'Warning')
    }
  }


  async smsSubmit() {
    this.submitSms = true;
    this.smsForm.value.countryCode = this.smsForm.value.countryCode.substring(1)
    if (this.smsForm.invalid) return;
    this.smsobj = { user_id: this.obj.user_id, mobile: this.smsForm.value.countryCode + this.smsForm.value.phoneNumber, password: this.smsForm.value.loginPassword }
    try {
      await this.smsauthentication.smsauthentication(this.smsobj)
      this.smsDetails = false;
      this.toastr.success('OTP sent', 'Great')
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
  }

  cancel() {
    this.smsDetails = true
    this.frameSms.hide();
    this.smsForm.reset();
  }
  cancel2() {
    this.smsDis.hide();
    this.smsDisableForm.reset();
  }
  async smsVerifySubmit() {
    this.submitSmsVerify = true;
    if (this.smsVerifyForm.invalid) return
    this.smsobjverify = { user_id: this.obj.user_id, mobile: this.smsForm.value.phoneNumber, otp: this.smsVerifyForm.value.smsOTP }
    try {
      await this.smsauthentication.smsVerify(this.smsobjverify)
      this.checkedsms = true;
      // this.checkDisableSms = true;
      localStorage.setItem('smsAuth', "true")
      this.cancel();
      this.toastr.success('SMS Authentication Enabled', 'Great')
    }
    catch (e) {
      console.log('yahan aa gya')
      this.toastr.error(e, 'Opps!')
    }
  }

  /** disable SMS */

  async smsDisableSubmit() {
    this.smsDisablesubmitted = true;
    if (this.smsDisableForm.invalid) return
    this.smsobj = { user_id: this.obj.user_id, mobile: this.userPhoneNumber, password: this.smsDisableForm.value.oldPassword }
    try {
      await this.smsauthentication.smsauthentication(this.smsobj)
      this.checkDisableSms = true;
      this.toastr.success('OTP sent', 'Great')
      this.smsDisableVerifyForm.reset();
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
  }

  async smsDisableVerifySubmit() {
    this.smsDisableVerifysubmitted = true
    if (this.smsDisableVerifyForm.invalid) return;
    try {
      let smsDisableVerify = { user_id: this.obj.user_id, password: this.smsobj.password, otp: this.smsDisableVerifyForm.value.smsDisableOtp }
      await this.smsauthentication.smsAuthDisableVerify(smsDisableVerify)
      this.checkedsms = false;
      localStorage.setItem('smsAuth', "false")
      this.cancel2();
      this.toastr.success('SMS Authentication Disabled', 'Great')
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
  }

  /* resend sms */
  async resendSms() {
    try {
      await this.smsauthentication.resendSMS(this.obj.user_id, this.localData.getlocalData()['token'])
      this.toastr.success('OTP Sent', "")
      return
    }
    catch (e) {
      this.toastr.error(e, "Oops!")
    }
  }

  /* change password */
  changePasswordModal() {
    this.changePasswordForm.reset();
    this.framex.show();
    this.twoFaForm.reset();
  }

  async changePasswordSubmit() {
    this.submitted2 = true;
    if (this.changePasswordForm.invalid) return;
    this.reqData = { user_id: this.obj.user_id, oldPassword: this.changePasswordForm.value.oldPassword, newPassword: this.changePasswordForm.value.newPassword, confirmPassword: this.changePasswordForm.value.confirmPassword }
    this.serviceType = "changePassword";
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.framex.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.framex.hide()
      this.twoFamodal.show()
    }
    else {
      try {
        await this.changePasssword.changePassword(this.reqData, this.localData.getlocalData()['token'])
        this.framex.hide()
        this.changePasswordForm.reset();
        this.toastr.success('Password reset successfully', 'Great')
      }
      catch (e) {
        this.toastr.error(e, "Oops!")
      }
    }
  }
  /* security questions */
  async securityQuestionModal() {
    this.securityStatus = false;
    this.securityQuestionForm.reset();
    try {
      let securityData = await this.securityQuestionData.gettingSecurityQuestion(this.obj.user_id)
      let count = 1
      securityData['data'].forEach(element => {
        if (count == 1) {
          this.q1 = element.sqId.securityQuestion
          this.a1 = element.answer;
        }
        else if (count == 2) {
          this.q2 = element.sqId.securityQuestion;
          this.a2 = element.answer;
        }
        else if (count == 3) {
          this.q3 = element.sqId.securityQuestion;
          this.a3 = element.answer;
        }
        count++;
      });
      let item = securityData['data'][Math.floor(Math.random() * securityData['data'].length)];
      this.securityQuesAsk = item['sqId']['securityQuestion'];
      this.securityQuesAns = item.answer
      console.log('ans>>>>', this.securityQuesAns)
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
    if (this.localData.getlocalData()['gauth'] === "true" || this.localData.getlocalData()['smsAuth'] === "true") this.frameSecurityQuestion.show()
    else this.toastr.warning('Enable 2FA for before change Security Question', 'Note')
  }
  securityQuestionSubmit() {
    if (this.securityQuestionForm.invalid) return;
    if (this.securityQuestionForm.value.securityQuesAnswer === this.securityQuesAns) {
      this.securityStatus = true;
      this.frameSecurityQuestion.show()
      try {
        this.apiCall.getRequest("sq/getSecurityQuestion/USER").subscribe(res => {
          this.questions = res['data'];
          this.question1 = res['data'].slice();
          this.question2 = res['data'].slice();
          this.question3 = res['data'].slice();
        })
      }
      catch (e) {
        this.toastr.error('Something went wrong', 'Opps!')
      }
    }
    else this.toastr.error("Answer is not correct", 'Opps!')
  }

  /* change security question */
  first(qs) {
    console.log('>?',qs)
    if (this.firstList.length) {
      this.question2.push(this.firstList[0])
      this.question3.push(this.firstList[0])
      this.firstList.pop()
    }
    this.firstList = this.question1.filter(ele => ele.securityQuestion === qs.value)

    this.question2.splice(this.question2.findIndex(ele => ele.securityQuestion === qs.value), 1)
    this.question3.splice(this.question3.findIndex(ele => ele.securityQuestion === qs.value), 1)
  }

  second(qs) {
    if (this.secondList.length) {
      this.question1.push(this.secondList[0])
      this.question3.push(this.secondList[0])
      this.secondList.pop()
    }
    this.secondList = this.question2.filter(ele => ele.securityQuestion === qs.value)
    this.question1.splice(this.question1.findIndex(ele => ele.securityQuestion === qs.value), 1)
    this.question3.splice(this.question3.findIndex(ele => ele.securityQuestion === qs.value), 1)
  }

  third(qs) {
    if (this.thirdList.length) {
      this.question1.push(this.thirdList[0])
      this.question2.push(this.thirdList[0])
      this.thirdList.pop()
    }
    this.thirdList = this.questions.filter(ele => ele.securityQuestion === qs.value)
    this.question1.splice(this.question1.findIndex(ele => ele.securityQuestion === qs.value), 1)
    this.question2.splice(this.question2.findIndex(ele => ele.securityQuestion === qs.value), 1)
  }
  async securityQuestionSelectSubmit() {
    if (this.securityQuestionSelectForm.invalid) return;
    this.reqData = {
      user_id: this.obj.user_id, securityQA: [
        {
          question: this.firstList[0]._id,
          answer: this.securityQuestionSelectForm.value.ansOne
        },
        {
          question: this.secondList[0]._id,
          answer: this.securityQuestionSelectForm.value.ansTwo

        },
        {
          question: this.thirdList[0]._id,
          answer: this.securityQuestionSelectForm.value.ansThree
        }
      ]
    }
    this.serviceType = "securityQuestions"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameSecurityQuestion.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameSecurityQuestion.hide()
      this.twoFamodal.show()
    }
  }


  /* Anti-Phishing  */
  antifishing() {
    this.antiPhishingForm.reset()
    this.twoFaForm.reset();
    if (this.localData.getlocalData()['gauth'] === "true" || this.localData.getlocalData()['smsAuth'] === "true") this.frameAnti.show()
    else this.toastr.warning('Enable 2FA for before enabling anti-phishing', 'Note')
  }

  async antiPhishingSubmit() {
    this.submittedx = true;
    if (this.antiPhishingForm.invalid) return;
    this.reqData = { user_id: this.obj.user_id, antiFishingCode: this.antiPhishingForm.value.antiCode }
    this.serviceType = "antiPhishing"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameAnti.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameAnti.hide()
      this.twoFamodal.show()
    }
  }
  async antiPhishingUpdate() {
    this.submittedx = true;
    if (this.antiPhishingForm.invalid) return;
    this.reqData = { user_id: this.obj.user_id, antiFishingCode: this.antiPhishingForm.value.antiCode }
    this.serviceType = "antiPhishingUpdate"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameAnti.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameAnti.hide()
      this.twoFamodal.show()
    }
  }


  /* Second Password  */
  secondPasswordModal() {
    this.secondPasswordStatus = false;
    this.secondPasswordForm.reset()
    this.twoFaForm.reset();
    if (this.localData.getlocalData()['gauth'] === "true" || this.localData.getlocalData()['smsAuth'] === "true") this.frameSecPsw.show()
    else this.toastr.warning('Enable 2FA for before enabling Second Password', 'Note')
  }

  async secondPasswordSubmit() {
    this.submittedx1 = true;
    if (this.secondPasswordForm.invalid) return;
    this.reqData = { user_id: this.obj.user_id, password: this.secondPasswordForm.value.newPassword, confirmPassword: this.secondPasswordForm.value.confirmPassword }
    this.serviceType = "secondPassword"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameSecPsw.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameSecPsw.hide()
      this.twoFamodal.show()
    }

  }
  /* Second Password Disable */
  secondPasswordDisableModal() {
    this.secondPasswordStatus = true;
    this.secondPasswordDisableForm.reset()
    this.twoFaForm.reset();
    if (this.localData.getlocalData()['gauth'] === "true" || this.localData.getlocalData()['smsAuth'] === "true") this.frameSecPswDisable.show()
    else this.toastr.warning('Enable 2FA for before disabling Second Password', 'Note')
  }
  async secondPasswordDisableSubmit() {
    this.submittedx2 = true;
    if (this.secondPasswordDisableForm.invalid) return;
    this.reqData = { user_id: this.obj.user_id, password: this.secondPasswordDisableForm.value.newPasswordDisable }
    this.serviceType = "secondPasswordDisable"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameSecPswDisable.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameSecPswDisable.hide()
      this.twoFamodal.show()
    }

  }
  /* second password change */
  secondPasswordChangeModal() {
    this.secondPasswordStatus = true;
    this.secondPasswordChangeForm.reset()
    this.twoFaForm.reset();
    if (this.localData.getlocalData()['gauth'] === "true" || this.localData.getlocalData()['smsAuth'] === "true") this.frameSecPswChange.show()
    else this.toastr.warning('Enable 2FA for before change Second Password', 'Note')
  }
  async secondPasswordChangeSubmit() {
    this.submittedx2 = true;
    if (this.secondPasswordChangeForm.invalid) return;
    this.reqData = { user_id: this.obj.user_id, password: this.secondPasswordChangeForm.value.newPassword, confirmPassword: this.secondPasswordChangeForm.value.confirmPassword, old_Pass: this.secondPasswordChangeForm.value.oldPassword }
    this.serviceType = "secondPasswordChange"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameSecPswChange.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameSecPswChange.hide()
      this.twoFamodal.show()
    }

  }
  /* second password form */
  secondPasswordForgotClick() {
    this.frameSecondPasswordForgot.show()
    this.secondPasswordForgotForm.reset()
    this.frameSecPswChange.hide()
    this.frameSecPswDisable.hide()
    this.twoFaForm.reset();
  }
  async secondPasswordForgotSubmit() {
    if (this.secondPasswordForgotForm.invalid) return
    this.reqData = { user_id: this.obj.user_id, password: this.secondPasswordForgotForm.value.password, newPassword: this.secondPasswordForgotForm.value.newPassword, confirmPassword: this.secondPasswordForgotForm.value.confirmPassword }
    this.serviceType = "secondPasswordForgot"
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.frameSecondPasswordForgot.hide()
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.frameSecondPasswordForgot.hide()
      this.twoFamodal.show()
    }
  }
  /* 2FA authentication  */
  onKey1(event: any) {
    if (event.target.value.length == 6) {
      this.twoFaModalSubmit();
    }
  }

  async twoFaModalSubmit() {
    this.submittedOtp = true
    if (!this.twoFaForm) return
    this.finalData = Object.assign(this.reqData, this.twoFaForm.value);
    try {
      console.log('second password>>>>>>>>>', this.finalData)
      let res = await this.twoFaAuth.twoFaValidate(this.finalData, this.serviceType)
      this.twoFamodal.hide();
      this.toastr.success(JSON.stringify(res), 'Great');
      if (this.serviceType == "antiPhishing") {
        this.antiPhishingStatus = true;
        localStorage.setItem('antiFishingCodeStatus', "true")
      }
      else if (this.serviceType == "secondPassword") {
        this.secondPasswordStatus = true;
        localStorage.setItem('secondPasswordStatus', "true")
      }
      else if (this.serviceType == "secondPasswordDisable") {
        this.secondPasswordStatus = false;
        localStorage.setItem('secondPasswordStatus', "false")
      }
      else if (this.serviceType == "secondPasswordChange") {
        this.secondPasswordStatus = true;
        localStorage.setItem('secondPasswordStatus', "true")
      }
    }
    catch (e) {
      if (e == "Invalid OTP") {
        this.toastr.error('Opps!', e)
        this.twoFaForm.reset();
      }
      else if (e == "Invalid Password" || e == "New Password not matching with confirm password") {
        this.toastr.error('Opps!', e)
        this.twoFamodal.hide();
        this.twoFaForm.reset();
        if (this.serviceType == "changePassword") {
          this.changePasswordForm.reset();
          this.framex.show();
        }
        else if (this.serviceType == "antiPhishing") {
          this.antiPhishingForm.reset();
          this.frameAnti.show();
        }
        else if (this.serviceType == "secondPassword") {
          this.secondPasswordForm.reset()
          this.frameSecPsw.show();
        }
        else if (this.serviceType == "secondPasswordDisable") {
          this.secondPasswordDisableForm.reset();
          this.frameSecPswDisable.show();
        }
        else if (this.serviceType == "secondPasswordChange") {
          this.secondPasswordChangeForm.reset();
          this.frameSecPswChange.show();
        }
        else if (this.serviceType == "secondPasswordForgot") {
          this.secondPasswordForgotForm.reset();
          this.frameSecondPasswordForgot.show();
        }
      }
      else if (e == "Use other password") {
        this.toastr.error('Opps!', e)
        this.twoFamodal.hide();
        this.twoFaForm.reset();
        this.changePasswordForm.reset();
        this.framex.show();
      }
    }
  }
  /* delete  device data */
  async deleteDeviceData(data) {
    try {
      await this.loginHistoryData.userDeviceDeleteDetails(this.obj.user_id, data, this.localData.getlocalData()['token'])
      this.toastr.success('Device Detail Deleted Successfully', 'Request Completed')
      this.loginHistoryData.userDeviceDetails(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
        this.deviceHistory = res['data']
        this.deviceHistory.forEach(element => {
          this.deviceActivity = element.info
        });
        this.userDeviceHistory();
      }, error => {
        console.log(error.status)
      })
    }
    catch (e) {
      this.toastr.error(e, 'Opps!')
    }
  }
} 
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from '../../../service/commonservice/common.service'
import { IndividualKycService } from '../../../service/kyc/individual-kyc.service'
import { GauthService } from '../../../service/gauthservice/gauth.service';
import { SmsauthService } from '../../../service/smsauthservice/smsauth.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kycindividual',
  templateUrl: './kycindividual.component.html',
  styleUrls: ['./kycindividual.component.scss']
})
export class KycindividualComponent implements OnInit {
  @ViewChild('twoFaModal') twoFamodal: ModalDirective;
  kycIndividualForm: FormGroup;
  kycIndividualStatus: true;
  genderStatus = true;
  isChecked = false;
  permanentAddress: any = []
  nextProcess = false;
  kycIndividualNextForm: FormGroup;
  result: any;
  document = 1;
  localStoreData: any;
  kycFirstStepData: any;
  kycSecondStepData: any;
  userFirstName: string;
  userLastName: string;
  userInfo: any;
  kycSubmitted = false
  btnStatus = false
  aaa: number
  obj: any;
  obj2: any;
  dob: any;
  /* Permanent details */
  flat: any
  street: any
  city: any
  state: any
  country: any
  postalCode: any
  uploadData = new FormData();
  spinnerLoad = false
  /* 2fa  */
  submittedOtp = false;
  twoFaSubmit = false;
  twoFaForm: FormGroup;
  arr: any = []
  reqData: any
  finalData: any
  serviceType: string;
  authType = false;
  hoverActivity = false;

  /* image variable */
  dummyImageFront = "assets/images/passportFront.png";
  dummyImageBack = "assets/images/passportOpen.png";
  dummyImageSelfie = "assets/images/selfieWithId.png"
  placeholderImgUrl = "assets/images/preview3.png";
  placeholderImgUrl2 = "assets/images/preview2.png";
  placeholderImgUrl3 = "assets/images/preview.png";
  placeholderImgUrl4: any;
  imageHeaderFirst = "Passport Cover"
  imageTextFirst = "Please make sure the document photo is complete and clearly visible, in JPEG format."
  imageHeaderSecond = "Passport Personal Page"
  imageTextSecond = "Please make sure the document photo is complete and clearly visible, in JPEG format. Identity card must be in valid period."
  imageHeaderThird = "Selfie with Passport and Note"
  imageTextThird = "Please provide a photo of you holding your Identity card. In the same picture, make a reference to Cifertron and today's date displayed. Make sure your face is clearly visible and all the identity card details are readable"
  documentType = "PASSPORT";
  imageName: any = null;

  constructor(private formBuilder: FormBuilder,
    private localData: CommonService,
    private kycService: IndividualKycService,
    private spinner: NgxSpinnerService,
    private smsauthentication: SmsauthService,
    private gAuth: GauthService,
    private toastr: ToastrService,
  ) { }
  ngOnInit() {
    this.localData.checkLogin()
    this.localStoreData = this.localData.getlocalData();
    this.localData.userInfo(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
      this.userInfo = res
      this.userFirstName = this.userInfo.data.firstName;
      this.userLastName = this.userInfo.data.lastName;
    }, error => {
      console.log(error.status)
    })
    /* First form data  */
    this.kycIndividualForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(16), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(16), Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      dateTime: ['', [Validators.required]],
      building: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[ _][a-zA-Z0-9]+)?$'), Validators.maxLength(62), Validators.minLength(6)]],
      locality: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])*$'), Validators.maxLength(62), Validators.minLength(6)]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(24), Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(24), Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(16), Validators.minLength(6)]],
      resBuilding: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(62), Validators.minLength(6)]],
      resLocality: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(62), Validators.minLength(6)]],
      resCity: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(24), Validators.minLength(2)]],
      resState: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(24), Validators.minLength(2)]],
      resCountry: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$'), Validators.maxLength(24), Validators.minLength(2)]],
      resPostalCode: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(16), Validators.minLength(6)]],
    }, { validator: this.dateOfBirth('dateTime') });
    /* next data */
    this.kycIndividualNextForm = this.formBuilder.group({
      top: ['', [Validators.required]],
      back: ['', [Validators.required]],
      selfey: ['', [Validators.required]]
    })
    /* 2FA Auth  */
    this.twoFaForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
    console.log('image name>>>>>>>>', this.imageName)
  }
  private dateOfBirth(dateTime) {
    return (group: FormGroup) => {
      const passwordInputData = group.controls[dateTime];
      this.aaa = parseInt(JSON.stringify(passwordInputData.value).slice(1, 5));
      let testing = new Date();
      let aa = testing.getFullYear() - this.aaa;
      if (aa <= 18) {
        return passwordInputData.setErrors({ notEquivalent: true });
      }
    }
  }

  /* for setting permanent address as Residential address  */
  permanentaddress(text) {
    if (text == 'flat' && (this.kycIndividualForm.value.building != undefined)) this.flat = this.kycIndividualForm.value.building
    if (text == 'street' && (this.kycIndividualForm.value.locality != undefined)) this.street = this.kycIndividualForm.value.locality
    if (text == 'city' && (this.kycIndividualForm.value.city != undefined)) this.city = this.kycIndividualForm.value.city
    if (text == 'state' && (this.kycIndividualForm.value.state != undefined)) this.state = this.kycIndividualForm.value.state
    if (text == 'country' && (this.kycIndividualForm.value.country != undefined)) this.country = this.kycIndividualForm.value.country
    if (text == 'postalCode' && (this.kycIndividualForm.value.postalCode != undefined)) this.postalCode = this.kycIndividualForm.value.postalCode
    if (text == 'flat' && (this.kycIndividualForm.value.building == undefined)) this.flat = undefined
    console.log('flat>>>>>', this.flat)
    if ((this.flat != undefined) && (this.street != undefined) && (this.state != undefined) && (this.city != undefined) && (this.country != undefined) && (this.postalCode != undefined)) {
      this.btnStatus = true
      console.log("button status >>>>>>>>", this.btnStatus)
    }
  }
  setResidentialAsPermanent(event) {
    if (event.checked === true) {
      this.isChecked = true
      this.kycIndividualForm.patchValue({ resBuilding: this.kycIndividualForm.value.building })
      this.kycIndividualForm.patchValue({ resLocality: this.kycIndividualForm.value.locality })
      this.kycIndividualForm.patchValue({ resState: this.kycIndividualForm.value.state })
      this.kycIndividualForm.patchValue({ resCity: this.kycIndividualForm.value.city })
      this.kycIndividualForm.patchValue({ resCountry: this.kycIndividualForm.value.country })
      this.kycIndividualForm.patchValue({ resPostalCode: this.kycIndividualForm.value.postalCode })
      event.checked = false
    }
    else {
      this.isChecked = false;
      this.kycIndividualForm.patchValue({ resBuilding: null })
      this.kycIndividualForm.patchValue({ resLocality: null })
      this.kycIndividualForm.patchValue({ resState: null })
      this.kycIndividualForm.patchValue({ resCity: null })
      this.kycIndividualForm.patchValue({ resCountry: null })
      this.kycIndividualForm.patchValue({ resPostalCode: null })
      event.checked = false
    }
  }
  /************ first step data  *************/
  kycIndividualSubmit() {
    if (this.kycIndividualForm.invalid) return
    this.obj = {
      locality: this.kycIndividualForm.value.locality,
      flat_house_Number: this.kycIndividualForm.value.building,
      city: this.kycIndividualForm.value.city,
      state: this.kycIndividualForm.value.state,
      country: this.kycIndividualForm.value.country,
      postalCode: this.kycIndividualForm.value.postalCode,
    }
    this.obj2 = {
      locality: this.kycIndividualForm.value.resLocality,
      flat_house_Number: this.kycIndividualForm.value.resBuilding,
      city: this.kycIndividualForm.value.resCity,
      state: this.kycIndividualForm.value.resState,
      country: this.kycIndividualForm.value.resCountry,
      postalCode: this.kycIndividualForm.value.resPostalCode,
    }
    this.nextProcess = true;
  }

  over() {
    this.hoverActivity = true;
    console.log('counting....')
  }
  over1() {
    this.hoverActivity = false;
    console.log('counting..22..')
  }
  /* uploading and preview images  */
  fileToUpload: File = null
  fileToUpload2: File = null
  fileToUpload3: File = null
  async handlingImage(event, text) {
    if (text == "top") {
      this.fileToUpload = event.target.files[0]
      if (this.fileToUpload.type == "image/png" || this.fileToUpload.type == "image/jpg" || this.fileToUpload.type == "image/jpeg") {
        this.imageName = this.fileToUpload.name
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.placeholderImgUrl = event.target.result;
        }
        await reader.readAsDataURL(this.fileToUpload)
        this.kycIndividualNextForm.value.top = this.fileToUpload;
      }
      else {
        this.fileToUpload = null;
        this.toastr.error("Only png/jpg file allowed", "Wrong file selected")
      }
    }
    if (text == "back") {
      this.fileToUpload2 = event.target.files[0]
      if (this.fileToUpload2.type == "image/png" || this.fileToUpload2.type == "image/jpg" || this.fileToUpload2.type == "image/jpeg") {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.placeholderImgUrl2 = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload2)
        this.kycIndividualNextForm.value.back = this.fileToUpload2;
      }
      else {
        this.fileToUpload2 = null;
        this.toastr.error("Only png/jpg file allowed", "Wrong file selected")
      }
    }
    if (text == "selfey") {
      this.fileToUpload3 = event.target.files[0]
      if (this.fileToUpload3.type == "image/png" || this.fileToUpload3.type == "image/jpg" || this.fileToUpload3.type == "image/jpeg") {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.placeholderImgUrl3 = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload3)
        this.kycIndividualNextForm.value.selfey = this.fileToUpload3;
      }
      else {
        this.fileToUpload2 = null;
        this.toastr.error("Only png/jpg file allowed", "Wrong file selected")
      }
    }
  }
  /* user click back to pervious step*/
  testing() {
    this.nextProcess = false;
    this.kycIndividualForm.patchValue({ firstName: this.kycIndividualForm.value.firstName })
    this.kycIndividualForm.patchValue({ lastName: this.kycIndividualForm.value.lastName })
    this.kycIndividualForm.patchValue({ gender: this.kycIndividualForm.value.gender })
    this.kycIndividualForm.patchValue({ dateTime: this.kycIndividualForm.value.dateTime })
    this.kycIndividualForm.patchValue({ building: this.kycIndividualForm.value.building })
    this.kycIndividualForm.patchValue({ locality: this.kycIndividualForm.value.locality })
    this.kycIndividualForm.patchValue({ state: this.kycIndividualForm.value.state })
    this.kycIndividualForm.patchValue({ city: this.kycIndividualForm.value.city })
    this.kycIndividualForm.patchValue({ country: this.kycIndividualForm.value.country })
    this.kycIndividualForm.patchValue({ postalCode: this.kycIndividualForm.value.postalCode })
    this.kycIndividualForm.patchValue({ resLocality: this.kycIndividualForm.value.resLocality })
    this.kycIndividualForm.patchValue({ resBuilding: this.kycIndividualForm.value.resBuilding })
    this.kycIndividualForm.patchValue({ resState: this.kycIndividualForm.value.resState })
    this.kycIndividualForm.patchValue({ resCity: this.kycIndividualForm.value.resCity })
    this.kycIndividualForm.patchValue({ resCountry: this.kycIndividualForm.value.resCountry })
    this.kycIndividualForm.patchValue({ resPostalCode: this.kycIndividualForm.value.resPostalCode })
  }
  /* select documents */
  documents(data) {
    this.kycIndividualNextForm.reset();
    this.imageName = null
    if (data == 1) {
      this.document = 1;
      this.documentType = "PASSPORT"
      this.dummyImageFront = "assets/images/passportFront.png";
      this.dummyImageBack = "assets/images/passportOpen.png";
      this.dummyImageSelfie = "assets/images/selfieWithId.png"
      this.placeholderImgUrl = "assets/images/preview3.png";
      this.placeholderImgUrl2 = "assets/images/preview2.png";
      this.placeholderImgUrl3 = "assets/images/preview.png";
      this.imageHeaderFirst = "Passport Cover"
      console.log(this.imageHeaderFirst)
      this.imageTextFirst = "Please make sure the document photo is complete and clearly visible, in JPEG format."
      this.imageHeaderSecond = "Passport Personal Page"
      this.imageTextSecond = "Please make sure the document photo is complete and clearly visible, in JPEG format. Identity card must be in valid period."
      this.imageHeaderThird = "Selfie with Passport and Note"
      this.imageTextThird = "Please provide a photo of you holding your Identity card. In the same picture, make a reference to Cifertron and today's date displayed. Make sure your face is clearly visible and all the identity card details are readable"
    }
    if (data == 2) {
      this.document = 2;
      this.documentType = "DRIVINGLICIENCE";
      this.dummyImageFront = "assets/images/dlFront.png";
      this.dummyImageBack = "assets/images/dlBack.png";
      this.dummyImageSelfie = "assets/images/selfieWithId.png"
      this.placeholderImgUrl = "assets/images/preview.png";
      this.placeholderImgUrl2 = "assets/images/preview.png";
      this.placeholderImgUrl3 = "assets/images/preview.png";
      this.imageHeaderFirst = "Driving Licience front side"
      this.imageTextFirst = "Please make sure the document photo is complete and clearly visible, in JPEG format."
      this.imageHeaderSecond = "Driving Licience Back side"
      this.imageTextSecond = "Please make sure the document photo is complete and clearly visible, in JPEG format. Identity card must be in valid period."
      this.imageHeaderThird = "Selfie with Driving Licience  and Note"
      this.imageTextThird = "Please provide a photo of you holding your Identity card. In the same picture, make a reference to Cifertron and today's date displayed. Make sure your face is clearly visible and all the identity card details are readable"
    }
    if (data == 3) {
      this.document = 3;
      this.documentType = "OTHER"
      this.dummyImageFront = "assets/images/idFront.png";
      this.dummyImageBack = "assets/images/idBack.png";
      this.dummyImageSelfie = "assets/images/selfieWithId.png"
      this.placeholderImgUrl = "assets/images/preview.png";
      this.placeholderImgUrl2 = "assets/images/preview.png";
      this.placeholderImgUrl3 = "assets/images/preview.png";
      this.imageHeaderFirst = "Other Government doc front side"
      this.imageTextFirst = "Please make sure the document photo is complete and clearly visible, in JPEG format."
      this.imageHeaderSecond = "Other Government doc Back side"
      this.imageTextSecond = "Please make sure the document photo is complete and clearly visible, in JPEG format. Identity card must be in valid period."
      this.imageHeaderThird = "Selfie with Other Government doc and Note"
      this.imageTextThird = "Please provide a photo of you holding your Identity card. In the same picture, make a reference to Cifertron and today's date displayed. Make sure your face is clearly visible and all the identity card details are readable"
    }
  }
  /* Last step Data  */
  async kycIndividualNextSubmit() {
    if (this.kycIndividualNextForm.invalid) return
    this.dob = new Date(this.kycIndividualForm.value.dateTime).getTime()
    this.uploadData.append('documentType', this.documentType);
    this.uploadData.append('documentImage', this.fileToUpload);
    this.uploadData.append('selfieWithDocument', this.fileToUpload2);
    this.uploadData.append('documentFrontSide', this.fileToUpload3)
    this.uploadData.append('contactInformationPermanent', JSON.stringify(this.obj));
    this.uploadData.append('contactInformationResidental', JSON.stringify(this.obj2));
    this.uploadData.append('user_id', this.localStoreData['userId']);
    this.uploadData.append('gender', this.kycIndividualForm.value.gender);
    this.uploadData.append('firstName', this.kycIndividualForm.value.firstName);
    this.uploadData.append('lastName', this.kycIndividualForm.value.lastName);
    this.uploadData.append('dob', this.dob);
    if (this.localData.getlocalData()['gauth'] === "true") {
      this.authType = false;
      this.twoFamodal.show()
    }
    else if (this.localData.getlocalData()['smsAuth'] === "true") {
      await this.resendSms()
      this.authType = true;
      this.twoFamodal.show()
    }
  }
  /* otp submit form  */
  async twoFaModalSubmit() {
    this.submittedOtp = true
    if (!this.twoFaForm) return
    /* GAuth verification  */
    if (this.authType == false) {
      let otpGauth = { user_id: this.localStoreData['userId'], token: this.twoFaForm.value.otp }
      try {
        await this.gAuth.verifyGauthCode(otpGauth, this.localStoreData['token'])
        this.twoFamodal.hide();
        try {
          window.scrollTo(0, 0)
          this.spinner.show();
          this.result = await this.kycService.individualKyc(this.uploadData)
          if (this.result.code == 200) this.kycSubmitted = true;
          this.spinner.hide()
        }
        catch (e) {
          this.toastr.error(e, 'Opps!')
          this.spinner.hide()
        }
      }
      catch (e) {
        this.toastr.error(e, 'Opps!')
        this.twoFaForm.reset();
      }
    }
    /* SMS Auth verification  */
    else if (this.authType == true) {
      let otpSMS = { user_id: this.localStoreData['userId'], otp: this.twoFaForm.value.otp }
      try {
        await this.smsauthentication.smsVerifyOtp(otpSMS)
        this.twoFamodal.hide();
        try {
          window.scrollTo(0, 0)
          this.spinner.show();
          this.result = await this.kycService.individualKyc(this.uploadData)
          if (this.result.code == 200) this.kycSubmitted = true;
          this.twoFamodal.hide();
          this.spinner.hide()
        }
        catch (e) {
          this.toastr.error(e, 'Opps!')
          this.spinner.hide()
        }
      }
      catch (e) {
        this.toastr.error(e, 'Opps!')
        this.twoFaForm.reset();
      }
    }
  }
  /* 6 digit auto submit OTP */
  onKey(event: any) {
    if (event.target.value.length == 6) {
      this.twoFaModalSubmit();
    }
  }

  /* resend sms */
  async resendSms() {
    try {
      await this.smsauthentication.resendSMS(this.localStoreData['userId'], this.localData.getlocalData()['token'])
      this.toastr.success('OTP Sent', "")
      return
    }
    catch (e) {
      this.toastr.error(e, "Oops!")
    }
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from '../../../service/commonservice/common.service'
import { IndividualKycService } from '../../../service/kyc/individual-kyc.service'
import { ModalDirective } from 'angular-bootstrap-md';
import { GauthService } from '../../../service/gauthservice/gauth.service';
import { SmsauthService } from '../../../service/smsauthservice/smsauth.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kyc-corporate-resumit',
  templateUrl: './kyc-corporate-resumit.component.html',
  styleUrls: ['./kyc-corporate-resumit.component.scss']
})
export class KycCorporateResumitComponent implements OnInit {
  kycCorporateForm: FormGroup;
  isChecked = false
  document = 1
  documentType = "PASSPORT"
  dummyImageFront = "assets/images/passportFront.png";
  dummyImageBack = "assets/images/passportOpen.png";
  dummyImageSelfie = "assets/images/selfieWithId.png"
  placeholderImgUrl = "assets/images/preview3.png";
  placeholderImgUrl2 = "assets/images/preview2.png";
  placeholderImgUrl3 = "assets/images/preview.png";
  imageHeaderFirst = "Passport Cover"
  imageTextFirst = "Please make sure the document photo is complete and clearly visible, in JPEG format."
  imageHeaderSecond = "Passport Personal Page"
  imageTextSecond = "Please make sure the document photo is complete and clearly visible, in JPEG format. Identity card must be in valid period."
  imageHeaderThird = "Selfie with Passport and Note"
  imageTextThird = "Please provide a photo of you holding your Identity card. In the same picture, make a reference to Cifertron and today's date displayed. Make sure your face is clearly visible and all the identity card details are readable"
  nextProcess = false;
  kycCorporateNextForm: FormGroup
  imgUrl: any = "assets/images/preview3.png";
  imgUrl2: any = "assets/images/preview.png";
  imgUrl3: any = "assets/images/preview.png";
  imgUrl4: any = "assets/images/preview.png";
  obj: any;
  obj2: any;
  products: any;
  localStoreData: any;
  kycSubmitted = false;
  uploadData = new FormData();

  constructor(private formBuilder: FormBuilder,
    private localData: CommonService,
    private kycService: IndividualKycService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.localStoreData = this.localData.getlocalData();
    this.localData.userInfo(this.localStoreData.userId, this.localStoreData.token).subscribe(res => {
      console.log('>>>>>>>>>>>>>>>>>>???????', res)
      this.products = res['data']['kycCorporatePopulate']
    }, error => {
      console.log(error.status)
    })
    this.kycCorporateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(16), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(16), Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      corporateName: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(24), Validators.minLength(4)]],
      corporateWebsite: ['', [Validators.required, Validators.pattern('^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$')]],
      sourceOfFund: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(24), Validators.minLength(2)]],
      taxiDentification: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(24), Validators.minLength(6)]],
      applicantDesignation: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(24), Validators.minLength(6)]],
      buildingNumber: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(64), Validators.minLength(6)]],
      streetAddress: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(64), Validators.minLength(6)]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(24), , Validators.minLength(6)]],
      officeBuildingNumber: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(64), , Validators.minLength(6)]],
      officeStreetAddress: ['', [Validators.required, , Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(64), , Validators.minLength(6)]],
      officeCity: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      officeState: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      officeCountry: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(24), , Validators.minLength(2)]],
      officePostalCode: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-]+)$'), Validators.maxLength(24), , Validators.minLength(6)]],

    })
    this.kycCorporateNextForm = this.formBuilder.group({
      top: ['', [Validators.required]],
      back: ['', [Validators.required]],
      selfey: ['', [Validators.required]],
      certifiacate: ['', [Validators.required]],
      listOfBoards: ['', [Validators.required]]
    })
  }
  setOfficeAsRegistry(event) {
    if (event.checked === true) {
      console.log(event.checked)
      this.isChecked = true
      this.kycCorporateForm.patchValue({ officeBuildingNumber: this.kycCorporateForm.value.buildingNumber })
      this.kycCorporateForm.patchValue({ officeStreetAddress: this.kycCorporateForm.value.streetAddress })
      this.kycCorporateForm.patchValue({ officeCity: this.kycCorporateForm.value.city })
      this.kycCorporateForm.patchValue({ officeState: this.kycCorporateForm.value.state })
      this.kycCorporateForm.patchValue({ officeCountry: this.kycCorporateForm.value.country })
      this.kycCorporateForm.patchValue({ officePostalCode: this.kycCorporateForm.value.postalCode })
    }
    else {
      this.isChecked = false;
      this.kycCorporateForm.patchValue({ officeBuildingNumber: null })
      this.kycCorporateForm.patchValue({ officeStreetAddress: null })
      this.kycCorporateForm.patchValue({ officeCity: null })
      this.kycCorporateForm.patchValue({ officeState: null })
      this.kycCorporateForm.patchValue({ officeCountry: null })
      this.kycCorporateForm.patchValue({ officePostalCode: null })
    }
  }
  testing() {
    this.nextProcess = false;
    this.kycCorporateForm.patchValue({ firstName: this.kycCorporateForm.value.fistName })
    this.kycCorporateForm.patchValue({ lastName: this.kycCorporateForm.value.lastName })
    this.kycCorporateForm.patchValue({ gender: this.kycCorporateForm.value.gender })
    this.kycCorporateForm.patchValue({ corporateName: this.kycCorporateForm.value.corporateName })
    this.kycCorporateForm.patchValue({ corporateWebsite: this.kycCorporateForm.value.corporateWebsite })
    this.kycCorporateForm.patchValue({ sourceOfFund: this.kycCorporateForm.value.sourceOfFund })
    this.kycCorporateForm.patchValue({ taxiDentification: this.kycCorporateForm.value.taxiDentification })
    this.kycCorporateForm.patchValue({ applicantDesignation: this.kycCorporateForm.value.applicantDesignation })
    this.kycCorporateForm.patchValue({ state: this.kycCorporateForm.value.state })
    this.kycCorporateForm.patchValue({ city: this.kycCorporateForm.value.city })
    this.kycCorporateForm.patchValue({ country: this.kycCorporateForm.value.country })
    this.kycCorporateForm.patchValue({ postalCode: this.kycCorporateForm.value.postalCode })
    this.kycCorporateForm.patchValue({ officeBuildingNumber: this.kycCorporateForm.value.officeBuildingNumber })
    this.kycCorporateForm.patchValue({ officeStreetAddress: this.kycCorporateForm.value.officeStreetAddress })
    this.kycCorporateForm.patchValue({ officeCity: this.kycCorporateForm.value.officeCity })
    this.kycCorporateForm.patchValue({ officeState: this.kycCorporateForm.value.officeState })
    this.kycCorporateForm.patchValue({ officeCountry: this.kycCorporateForm.value.officeCountry })
    this.kycCorporateForm.patchValue({ officePostalCode: this.kycCorporateForm.value.officePostalCode })
  }
  fileToUpload: File = null
  fileToUpload2: File = null
  fileToUpload3: File = null
  fileToUpload4: File = null
  fileToUpload5: File = null
  handlingImage(event, text) {
    if (text == "top") {
      this.fileToUpload = event.target.files[0]
      if (this.fileToUpload.type == "image/png" || this.fileToUpload.type == "image/jpg" || this.fileToUpload.type == "image/jpeg") {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.placeholderImgUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload)
        this.kycCorporateNextForm.value.top = this.fileToUpload;
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
        this.kycCorporateNextForm.value.back = this.fileToUpload2;
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
        this.kycCorporateNextForm.value.selfey = this.fileToUpload3;
      }
      else {
        this.fileToUpload3 = null;
        this.toastr.error("Only png/jpg file allowed", "Wrong file selected")
      }
    }
  }
  async companyFiles(event, text) {
    if (text == "certifiacate") {
      this.fileToUpload4 = event.target.files[0]
      if (this.fileToUpload4.type == "image/pdf" || this.fileToUpload4.type == "image/doc" || this.fileToUpload4.type == "image/png" || this.fileToUpload4.type == "image/jpg" || this.fileToUpload4.type == "image/jpeg") {
        let reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload4)
        this.kycCorporateNextForm.value.certifiacate = this.fileToUpload4;
      }
      else {
        this.fileToUpload4 = null;
        this.toastr.error("Only pdf/doc/png/jpg file allowed", "Wrong file selected")
      }
    }
    if (text == "listOfBoards") {
      this.fileToUpload5 = event.target.files[0]
      if (this.fileToUpload5.type == "image/pdf" || this.fileToUpload5.type == "image/doc" || this.fileToUpload5.type == "image/png" || this.fileToUpload5.type == "image/jpg" || this.fileToUpload5.type == "image/jpeg") {
        let reader = new FileReader();
        await reader.readAsDataURL(this.fileToUpload5)
        this.kycCorporateNextForm.value.listOfBoards = this.fileToUpload5;
      }
      else {
        this.fileToUpload5 = null;
        this.toastr.error("Only pdf/doc/png/jpg file allowed", "Wrong file selected")
      }
    }

  }


  documents(data) {
    this.kycCorporateNextForm.reset();
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
  kycCorporateSubmit() {
    console.log("before submit form", this.kycCorporateForm.value)
    if (this.kycCorporateForm.invalid) return
    this.obj = {
      "flat_house_Number": this.kycCorporateForm.value.buildingNumber,
      "locality": this.kycCorporateForm.value.streetAddress,
      "city": this.kycCorporateForm.value.city,
      "state": this.kycCorporateForm.value.state,
      "country": this.kycCorporateForm.value.country,
      "postalCode": this.kycCorporateForm.value.postalCode,
    }
    this.obj2 = {
      "flat_house_Number": this.kycCorporateForm.value.officeBuildingNumber,
      "locality": this.kycCorporateForm.value.officeStreetAddress,
      "city": this.kycCorporateForm.value.officeCity,
      "state": this.kycCorporateForm.value.officeState,
      "country": this.kycCorporateForm.value.officeCountry,
      "postalCode": this.kycCorporateForm.value.officePostalCode,
    }
    this.nextProcess = true;
  }
  async kycCorporateNextSubmit() {
    console.log('this>>>>coroprate>>>>>>>>', this.kycCorporateNextForm.value)
    console.log('this>>>>coroprate>>>document type>>>>>', this.documentType)
    if (!this.products.documentTypeKycStatus && this.kycCorporateNextForm.invalid) return
    if (!this.products.documentTypeKycStatus) {
      this.uploadData.append('documentType', this.documentType);
      this.uploadData.append('documentImage', this.fileToUpload);
      this.uploadData.append('documentFrontSide', this.fileToUpload2);
      this.uploadData.append('selfieWithDocument', this.fileToUpload3);
      this.uploadData.append('corporationRegistrationCertificate', this.fileToUpload4);
      this.uploadData.append('listOfBoards', this.fileToUpload5);
    }
    if (!this.products.companyRegistryInformationKycStatus) this.uploadData.append('companyRegistryInformation', JSON.stringify(this.obj));
    if (!this.products.companyOfficeInformationKycStatus) this.uploadData.append('companyOfficeInformation', JSON.stringify(this.obj2));
    this.uploadData.append('user_id', this.localStoreData['userId']);
    if (!this.products.genderKycStatus) this.uploadData.append('gender', this.kycCorporateForm.value.gender);
    if (!this.products.firstNameKycStatus) {
      console.log('firsdt name>>>>> ', this.kycCorporateForm.value.firstName)
      this.uploadData.append('firstName', this.kycCorporateForm.value.firstName);
    }
    if (!this.products.lastNameKycStatus) this.uploadData.append('lastName', this.kycCorporateForm.value.lastName);
    if (!this.products.corporateNameKycStatus) this.uploadData.append('corporateName', this.kycCorporateForm.value.corporateName);
    if (!this.products.corporationWebSiteKycStatus) this.uploadData.append('corporationWebSite', this.kycCorporateForm.value.corporateWebsite);
    if (!this.products.sourceOfInvestmentFundKycStatus) this.uploadData.append('sourceOfInvestmentFund', this.kycCorporateForm.value.sourceOfFund);
    if (!this.products.taxIdentificationNumberKycStatus) this.uploadData.append('taxIdentificationNumber', this.kycCorporateForm.value.taxiDentification);
    if (!this.products.applicationDesignationKycStatus) this.uploadData.append('applicantDesignation', this.kycCorporateForm.value.applicantDesignation);
    try {
      this.spinner.show();
      await this.kycService.resubitCorporateKyc(this.uploadData)
      this.kycSubmitted = true;
      this.spinner.hide()
    }
    catch (e) {
      this.spinner.hide()
      console.log("apna Error =>")
    }
  }

}

import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from '../../service/registerservice/register.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { CountrydataService } from '../../service/countrydata/countrydata.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  submitted2 = false;
  regDetails = false;
  test: boolean
  hide = true;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  country: AbstractControl;
  referralCode: AbstractControl;
  tnc: AbstractControl;
  optionsSelect: Array<any>;
  regdetailsForm: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  quesOne: any;
  quesTwo: any;
  quesThree: any;
  ansOne: AbstractControl;
  ansTwo: AbstractControl;
  ansThree: AbstractControl;
  questions: any = [];
  question1: any = [];
  question2: any = [];
  question3: any = [];
  allData: any;
  allData2: any;
  merged: any;
  arr: any = [];
  firstList: any = [];
  secondList: any = [];
  thirdList: any = [];
  selectedLevel: any;
  securityQA: Array<any>;
  objectKeys = Object.keys;
  count = false;
  dropdownCheck=false
  i="Select Country"
  constructor(
    private router: Router, private activateRoute: ActivatedRoute,
    private service: RegisterService,
    private formBuilder: FormBuilder,
    private crypt: EncryptService,
    private countryData: CountrydataService,
    private toastr: ToastrService,
    private apiCall: CommoncallService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: [null, Validators.required],
      country: ['', Validators.required],
      tnc: ['', Validators.required],
      referralCode: [''],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});
    this.regdetailsForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
      quesOne: ['', [Validators.required]],
      ansOne: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2)]],
      quesTwo: ['', [Validators.required]],
      ansTwo: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2)]],
      quesThree: ['', Validators.required],
      ansThree: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2)]],
    });
    this.countryData.country.forEach(element => {
      this.arr.push(element.name)
    });
  }
  checkbox() {
      if (this.count == false)this.count = true;
      else if (this.count == true)this.count = false;
  }
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordConfirmationInput.value == null) {
        return passwordConfirmationInput.setErrors({ required: true });
      }
      else if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
    };
  }
  async registerSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.hide = false;
    this.regDetails = true;
    this.allData = this.registerForm.value;
    this.apiCall.getRequest("sq/getSecurityQuestion/USER").subscribe(res => {
      this.questions = res['data'];
      this.question1 = res['data'].slice();
      this.question2 = res['data'].slice();
      this.question3 = res['data'].slice();
    })
  }
  first(qs) {
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
  async regdetailsSubmit() {
    this.submitted2 = true;
    if (this.regdetailsForm.invalid) {
      return;
    }
    this.securityQA = [
      {
        question: this.firstList[0]._id,
        answer: this.regdetailsForm.value.ansOne
      },
      {
        question: this.secondList[0]._id,
        answer: this.regdetailsForm.value.ansTwo

      },
      {
        question: this.thirdList[0]._id,
        answer: this.regdetailsForm.value.ansThree

      }
    ]
    this.allData2 = this.regdetailsForm.value;
    delete this.allData2.quesOne;
    delete this.allData2.quesTwo;
    delete this.allData2.quesThree;
    delete this.allData2.ansOne;
    delete this.allData2.ansTwo;
    delete this.allData2.ansThree;
    this.merged = Object.assign(this.allData, this.allData2);
    this.merged.securityQA = this.securityQA;
    try {
      await this.service.signup(this.merged)
      let encryptData = this.crypt.set('123456*1@#$#@$^@1ERF', this.merged['email']);
      let email = encryptData.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
      this.router.navigate(['/mailverify/' + email]);
    }
    catch (e) {
      this.toastr.error(e, 'Opps!');
      this.ngOnInit();
      this.hide = true;
      this.regDetails = false;
    }
  }

}

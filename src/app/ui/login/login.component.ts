import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../../service/loginservice/login.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { CommonService } from '../../service/commonservice/common.service'
import { ErrorserviceService } from '../../service/errorservice/errorservice.service'
import { Location, SlicePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  email: AbstractControl;
  password: AbstractControl;
  data: any = [];
  dataSource: any = [];
  reqData: any = [];


  constructor(
    private router: Router, private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: LoginService,
    private crypt: EncryptService,
    private setlocaldata: CommonService,
    private errorCall: ErrorserviceService,
    private location: Location,
    private toastr: ToastrService) { }

  ngOnInit() {

    if (this.setlocaldata.getlocalData()['token']) {
      this.location.back();
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }
  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    try {
       await this.service.signInApiCall(this.loginForm.value)
       return
    }
    catch (e) {
      this.toastr.error(e, "Oops!")
    }
  }
}

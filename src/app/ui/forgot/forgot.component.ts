import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ForgotserviceService } from '../../service/forgotservice/forgotservice.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  mailSuccess=false
  resetformSuccess=true
  forgotForm: FormGroup;
  submitted = false;
  email: AbstractControl;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private forgotPassword: ForgotserviceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.maxLength(32)]],
    });
  }
  async resetSubmit() {
    this.submitted = true;
    if (this.forgotForm.invalid) return;
    try {
      await this.forgotPassword.resetLink(this.forgotForm.value.email)
      this.mailSuccess=true;
      this.resetformSuccess=false;
      return
    }
    catch (e) {
      this.toastr.error(e, "Oops!")
    }
  }
}

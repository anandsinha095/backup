import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ForgotserviceService } from '../../service/forgotservice/forgotservice.service'
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  confirmPassword: AbstractControl;
  password: AbstractControl;
  params: any
  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private resetService: ForgotserviceService) { }

  ngOnInit() {
    this.params = this.route.snapshot.paramMap.get('id');
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: [null, Validators.required]
    },
      { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
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
  async resetSubmit() {
    this.submitted = true;
    if (!this.resetForm.valid) return
    try {
     await  this.resetService.resetPassword(this.resetForm.value, this.params)
     this.toastr.success("Password has been reset", "Great!")
     this.router.navigate(['/login'])
    }
    catch (e) {
      this.toastr.error(e, "Oops!")
    }
  }

}

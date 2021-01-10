import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResendMailService } from '../../service/mailservice/resend-mail.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authorised',
  templateUrl: './authorised.component.html',
  styleUrls: ['./authorised.component.scss']
})
export class AuthorisedComponent implements OnInit {

  constructor( private resend: ResendMailService,
    private router: Router,
    private crypt:EncryptService,
    private toastr:ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    let token= this.route.snapshot.paramMap.get('id');
    try {
      this.resend.mailconfirmation('user/registerNewIP/'+token)
      localStorage.clear();
    }
    catch(e){
      this.toastr.error(e,'Opps!')
    }
  }

}

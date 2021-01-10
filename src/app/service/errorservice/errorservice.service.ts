import { Injectable } from '@angular/core';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorserviceService {

  constructor(
    private crypt:EncryptService,
    private router:Router,
  ) { }
  error404(){
    let content="Invalid Email or Password"
    return content
  }
  error461(userEmail){
    let encryptData = this.crypt.set('123456*1@#$#@$^@1ERF',userEmail);
    let email = encryptData.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
    this.router.navigate(['/mailverify/' + email]);
  }
  error460(userEmail){
    let encryptData = this.crypt.set('123456*1@#$#@$^@1ERF', userEmail);
    let email = encryptData.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
    this.router.navigate(['/unauthorised/' + email]);
  }

}


import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../service/cryptodataservice/crypto-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  crypto:any;

  constructor(private cryptodata: CryptoDataService) { }

  ngOnInit() {
    this.cryptodata.getUsers().subscribe(cryptodata => {
      this.crypto = cryptodata
      console.log(this.crypto);
    }
    );
  }

}

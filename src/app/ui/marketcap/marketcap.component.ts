import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../service/cryptodataservice/crypto-data.service';


@Component({
  selector: 'app-marketcap',
  templateUrl: './marketcap.component.html',
  styleUrls: ['./marketcap.component.scss']
})
export class MarketcapComponent implements OnInit {
  users: any;

  constructor(private cryptodata: CryptoDataService) { }

  ngOnInit() {
    this.cryptodata.getUsers().subscribe(cryptodata => {
      this.users = cryptodata
    });
  }

}

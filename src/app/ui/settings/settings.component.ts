import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { GauthService } from '../../service/gauthservice/gauth.service';
import { SmsauthService } from '../../service/smsauthservice/smsauth.service';
import { GetcoinService } from '../../service/cryptoCoin/getcoin.service';
import { CommonService } from '../../service/commonservice/common.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CryptoDataService } from '../../service/cryptodataservice/crypto-data.service';
import { TwoFaService } from '../../service/twofa/two-fa.service'
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { AddCryptoService } from '../../service/userSetting/add-crypto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('twoFaModal') twoFamodal: ModalDirective;
  crypto: any = [];
  crypto2 = false;
  crypto3 = false;
  crypto4 = false;
  feeKeyStatusFiat = false;
  feeKeyStatusBtc = false;
  feeKeyStatusRps = false;
  selectCoinForm: FormGroup;
  allCoin: any = [];
  cryptoPaymentStatus = false;
  cryptoCoinName: any;
  coinId: any;
  withdrawalAddress: any = []
  toggleStatus = false;
  toggleValue: any;
  addressStatus = false;
  dropdownCheck = false;
  placeholder = "Select a coin/Token to deposit";
  constructor(private gAuth: GauthService,
    private smsauthentication: SmsauthService,
    private getcoin: GetcoinService,
    private formBuilder: FormBuilder,
    private localData: CommonService,
    private toastr: ToastrService,
    private apiCall: CommoncallService,
    private twoFaAuth: TwoFaService,
    private router: Router,
    private cryptoData: CryptoDataService,
    private addCrypto: AddCryptoService) { }

  ngOnInit() {
    /* Checking token is available or not */
    this.localData.checkLogin()
    /* select coin form  */
    this.selectCoinForm = this.formBuilder.group({
      coinName: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
    /* fetching all coin function  */
    this.getAllCoin();
  }
  /* fetching all coin function  */
  getAllCoin() {
    this.apiCall.getRequestHeader("coin/common/getCoin_List", this.localData.getlocalData()['token']).subscribe(res => {
      this.allCoin = res['data']
    }, error => {
      if (error) this.toastr.error("Something went wrong!")
    })
  }
  /* selected coin  */
  getCoin(coin) {
    this.cryptoPaymentStatus = false;
    this.cryptoCoinName = coin.value
    console.log('coin value>>',this.cryptoCoinName)

    this.allCoin.forEach(element => {
      if (element.coinName == this.cryptoCoinName) this.coinId = element._id
      console.log('coin id>>>>', this.coinId)
    })
    this.allWithdrawalAddress();
  }

  async removeWithdrawalAddress(address) {
    let data: any = await this.addCrypto.removeUserWithdrawalAddress(this.coinId, this.localData.getlocalData()['userId'], address)
    this.allWithdrawalAddress();
  }
  async allWithdrawalAddress() {
    let data: any = await this.addCrypto.getWithdrwalAddesss(this.coinId, this.localData.getlocalData()['userId'])
    console.log('main data>>>', data)
    for (let i = 0; i < data.length; i++) {
      this.withdrawalAddress = data[i].address
      console.log('addess>>>>>>>>>', this.withdrawalAddress)
    };
  }
  /* fee button */
  async feeSetting(feeCoin) {
    let setfeeCoin = { currencyType: feeCoin }
    try {
      let data = await this.addCrypto.setFee(setfeeCoin, this.localData.getlocalData()['userId'])
      if (feeCoin == 'BTC') {
        this.feeKeyStatusBtc = true;
        this.feeKeyStatusFiat = false;
        this.feeKeyStatusRps = false;
      }
      if (feeCoin == 'RPS') {
        this.feeKeyStatusBtc = false;
        this.feeKeyStatusFiat = false;
        this.feeKeyStatusRps = true;
      }
      if (feeCoin == 'USD') {
        this.feeKeyStatusBtc = false;
        this.feeKeyStatusFiat = true;
        this.feeKeyStatusRps = false;
      }
      this.toastr.success('Fee type Updated', 'Awesome')
    }
    catch (e) {
      this.toastr.error('Something went wrong!', e);
      this.feeKeyStatusBtc = false;
      this.feeKeyStatusFiat = false;
      this.feeKeyStatusRps = false;
    }
  }
  async addAddressSubmit() {
 //   if (!this.selectCoinForm.valid) return
    let data = { userId: this.localData.getlocalData()['userId'], coinName: this.cryptoCoinName, address: this.selectCoinForm.value.address, coinId: this.coinId }
    console.log('>>>>>>>>>>',data)
    await this.addCrypto.addCryptoAddress(data);
    this.placeholder = "Select a coin/Token to deposit";
    this.selectCoinForm.reset();
  }
  address(crypto) {
    let toggleClick: any = ["crypto", "crypto2", "crypto3", "crypto4"];
    if (this.toggleValue == undefined && !this.toggleStatus) {
      this.toggleValue = toggleClick.indexOf(crypto);
      this.toggleStatus = true;
    }
    else if (this.toggleValue == toggleClick.indexOf(crypto) && this.toggleStatus) {
      this.toggleStatus = false;
      this.toggleValue = undefined;
    }
    else if (this.toggleValue != toggleClick.indexOf(crypto) && this.toggleStatus) {
      this.toggleStatus = false;
      this.toggleValue = toggleClick.indexOf(crypto);
      this.toggleStatus = true;
    }
  }
}

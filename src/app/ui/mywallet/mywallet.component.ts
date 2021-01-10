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
import { AddCryptoService } from '../../service/userSetting/add-crypto.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from '../../service/websocket/websocket.service'


@Component({
  selector: 'app-mywallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.scss']
})

export class MywalletComponent implements OnInit {
  deposit = true;
  withdrawal = false;
  crypto: boolean = false;
  fiat: boolean = false;
  public isCollapsed = false;
  allCoin: any = []
  cryptoCoinName: any
  selectCoinForm: FormGroup
  paymentMethodForm: FormGroup
  paymentType: any
  cryptoPaymentStatus: any = 0;
  cryptoAddress: any;
  ethAddess: any
  cryptoAddressQR: any;
  transactionHistory: any = [];
  arr: any = []
  arr1: any = []
  moreInfo = false;
  elements: any = [];
  historyStatus = true;
  userTxid: any;
  coinId: any;
  balanceStatus = false;
  balaceHistory: any = [];
  arrBalance: any = [];
  cryptoLivePrice: any = [];
  liveEthPrice: any;
  userAmount: any;
  coinSymbol: any;
  depositMethodStatus = false;
  coinNotListed: any;
  coinNotlistedStatus = false;
  selectCoinWithdrawalForm: FormGroup;
  allCoin2: any
  coinSymbol2: any
  withdrawalAddress: any = [];
  withdrawalPaymentMethodForm: FormGroup
  userWithdrawalId: any;
  depositHistoryData: any
  withdrawHistoryStatus=true;
  withdrawTransactionHistory:any;
  coinImage:any;

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
    private cryptoWithdrawalAddress: AddCryptoService,
    private socket: WebsocketService) { }

  ngOnInit() {
    /* Checking token is available or not */
    this.localData.checkLogin()

    /* select coin form  */
    this.selectCoinForm = this.formBuilder.group({
      coinName: ['', [Validators.required]],
    })
    this.paymentMethodForm = this.formBuilder.group({
      paymentType: ['', [Validators.required,]],
    })
    this.withdrawalPaymentMethodForm = this.formBuilder.group({
      paymentType: ['', [Validators.required]],
      userWithdrawalAddress: ['', [Validators.required]],
      amountNeedToWithdraw: ['', [Validators.required]],
    })
    /* fetching all coin function  */
    this.getAllCoin();
    /* tx history */
    this.socket.results.subscribe((res: any) => {
      if (res != null) this.txHistory(res);
    })
    /* withdraw History */
    this.socket.withdraw.subscribe((res:any)=>{
      if (res != null) this.withdrawTxHistory(res);
    })
    /* balance History */
    this.socket.balance.subscribe((res:any)=>{
      if (res != null) this.balanceCoin(res);
    })
    /* live price */
    this.liveCryptoPrice();
  }

  /* fetching live price of crypto */
  liveCryptoPrice() {
    this.cryptoData.getUsers().subscribe(cryptodata => {
      this.cryptoLivePrice = cryptodata
    });
  }
  /* fetching all coin function  */
  getAllCoin() {
    this.apiCall.getRequestHeader("coin/common/getCoin_List", this.localData.getlocalData()['token']).subscribe(res => {
      this.allCoin = res['data']
    }, error => {
      if (error.status == 404) this.toastr.error("User does't exist!", 'Opps!')
      if (error) this.toastr.error("Something went wrong!")
    })
  }
  /* tx history */
  txHistory(res) {
    this.arr = []
    this.transactionHistory = res
    if (this.transactionHistory.length == 0) this.historyStatus = false;
    else this.historyStatus = true;
    this.transactionHistory.forEach(element => {
      if (this.arr['txHash'] != element.txHash) {
        if (element.coinName == "ETH") {
          this.arr.push(
            {
              "id": element._id,
              "status": element.status,
              "coinName": element.coinName,
              "amount": (element.amount / 1000000000000000000).toFixed(8),
              "createdAt": element.createdAt.slice(0, 10),
              "txHash": element.txHash,
              "updatedAt": element.updatedAt,
              "sender_address": element.sender_address,
            })
        }
        else {
          this.arr.push(
            {
              "id": element._id,
              "status": element.status,
              "coinName": element.coinName,
              "amount": element.amount,
              "createdAt": element.createdAt.slice(0, 10),
              "txHash": element.txHash,
              "updatedAt": element.updatedAt,
              "sender_address": element.sender_address,
            })
        }
      }
    });
    // }, error => {
    //   if (error.status == 404) this.toastr.error("User does't exist!", 'Opps!')
    //   if (error) this.toastr.error("Something went wrong!")
    // })
  }
  /* balance */
  balanceCoin(res) {
    console.log('balanace>>>>>',res)
    this.arrBalance = []
    this.balaceHistory = res
    if (this.balaceHistory.length == 0) this.balanceStatus = false;
    else this.balanceStatus = true;
      this.balaceHistory.forEach(element => {
        if (element.coinId != null) {
          if (element.coinId.symbol == "ETH") {
            this.arrBalance.push(
              {
                "id": element._id,
                "estimatedValue": element.estimatedValue,
                "availableBalance": (element.availableBalance / 1000000000000000000).toFixed(8),
                "inOrder": element.inOrder,
                "coinId": element.coinId.coinName,
                "coinSymbol": element.coinId.symbol,
                "coinImage": element.coinId.coinImage
              })
          }
          else {
            this.arrBalance.push(
              {
                "id": element._id,
                "estimatedValue": element.estimatedValue,
                "availableBalance": (element.availableBalance).toFixed(8),
                "inOrder": element.inOrder,
                "coinId": element.coinId.coinName,
                "coinSymbol": element.coinId.symbol,
                "coinImage": element.coinId.coinImage
              })
          }
        }
      });
  }
  /* Selection Deposit and withdrawal  */
  depositTab(data) {
    this.selectCoinForm.reset();
    this.coinId = undefined;
    this.cryptoPaymentStatus = 0;
    this.depositMethodStatus = false;
    if (data == 'deposit') {
      this.deposit = true;
      this.withdrawal = false;
    }
    else if (data == 'withdrawal') {
      this.withdrawal = true;
      this.deposit = false;
    }
  }
  /* selected coin  */
  getCoin(coin) {
    this.paymentMethodForm.reset();
    this.withdrawalPaymentMethodForm.reset();
    this.cryptoPaymentStatus = 0;
    this.coinNotlistedStatus = false;
    this.coinId = coin.value
    this.depositMethodStatus = true;
    this.allCoin.forEach(element => {
      if (element._id == this.coinId) this.coinSymbol = element.symbol
    })
  }
  /* toggle details hash and sender address */
  toggleData(id) {
    if (!this.moreInfo) {
      this.moreInfo = true;
      this.userTxid = id
    }
    else if (this.moreInfo && this.userTxid != id) {
      this.moreInfo = false;
      this.userTxid = id;
      this.moreInfo = true;
    }
    else if (this.moreInfo && this.userTxid == id) {
      this.moreInfo = false;
      this.userTxid = undefined;
    }
  }


  async paymentMethod(paymentType) {
    console.log(paymentType)
    this.paymentType = paymentType
    if (this.paymentType == "crypto") {
      this.cryptoAddressQR = null
      this.cryptoPaymentStatus = 1;
      if (this.coinSymbol == 'BTC') {
        let address = await this.getcoin.getCryptoAddress('coin/btc/generate_Address/' + this.coinId);
        this.cryptoAddress = address['data']['coinAddress']
        this.cryptoAddressQR = address['data']['qrOfCoinAddress']
      }
      if (this.coinSymbol == 'ETH') {
        let address = await this.getcoin.getCryptoAddress('coin/eth/generate_Address/' + this.coinId);
        this.cryptoAddress = address['data']['coinAddress']
        this.cryptoAddressQR = address['data']['qrOfCoinAddress']
        this.coinImage="assets/icons/eth.png"
      }
      else if (this.coinSymbol != 'BTC' && this.coinSymbol != 'ETH') {
        this.coinNotlistedStatus = true;
        this.coinNotListed = "Coin not listed "
      }
    }
    else if (this.paymentType == "fiat") {
      this.cryptoPaymentStatus = 2;
    }
  }
  /************* Withdraw Section  ***************/
  async withdrawalPaymentMethod(paymentType) {
    this.cryptoPaymentStatus = 1;
    this.paymentType = paymentType
    this.withdrawalAddress = []
    if (this.paymentType == "crypto") {
      let data: any = await this.cryptoWithdrawalAddress.getWithdrwalAddesss(this.coinId, this.localData.getlocalData()['userId'])
      for (let i = 0; i < data.length; i++) {
        this.withdrawalAddress = data[i].address
      };
    }
    else if (this.paymentType == "fiat") {
      this.cryptoPaymentStatus = 2;
    }
  }
  addressChecking(address) {
    this.userWithdrawalId = address;
    if (this.userWithdrawalId) {
      this.withdrawalPaymentMethodForm.patchValue({ 'userWithdrawalAddress': this.userWithdrawalId })
      this.withdrawalPaymentMethodForm.patchValue({ 'paymentType': this.paymentType })
      console.log(this.withdrawalPaymentMethodForm)
    }
  }
  async withdrawalPaymentMethodSubmit() {
    if (this.withdrawalPaymentMethodForm.invalid) return
    let data={userId:this.localData.getlocalData()['userId'],coinId:this.coinId,toAddr:this.withdrawalPaymentMethodForm.value.userWithdrawalAddress,withDraw_amount1:this.withdrawalPaymentMethodForm.value.amountNeedToWithdraw}
    await this.cryptoWithdrawalAddress.withdraw(data)
  }
  withdrawTxHistory(res) {
    this.arr1 = []
    this.withdrawTransactionHistory = res
    if (this.withdrawTransactionHistory.length == 0) this.withdrawHistoryStatus = false;
    else this.withdrawHistoryStatus = true;
    this.withdrawTransactionHistory.forEach(element => {
      if (this.arr1['txHash'] != element.txHash) {
        if (element.coinName == "ETH") {
          this.arr1.push(
            {
              "id": element._id,
              "status": element.status,
              "coinName": element.coinName,
              "amount": (element.amount / 1000000000000000000).toFixed(6),
              "createdAt": element.createdAt.slice(0, 10),
              "txHash": element.txHash,
              "updatedAt": element.updatedAt,
              "sender_address": element.sender_address,
            })
        }
        else {
          this.arr1.push(
            {
              "id": element._id,
              "status": element.status,
              "coinName": element.coinName,
              "amount": element.amount,
              "createdAt": element.createdAt.slice(0, 10),
              "txHash": element.txHash,
              "updatedAt": element.updatedAt,
              "sender_address": element.sender_address,
            })
        }
      }
    });
  }
}


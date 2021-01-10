import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './ui/register/register.component';
import { LoginComponent } from './ui/login/login.component';
import { ForgotComponent } from './ui/forgot/forgot.component';
import { VerifyComponent } from './ui/verify/verify.component';
import { HomeComponent } from './ui/home/home.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { AccountComponent } from "./ui/account/AccountComponent";
import { MailverifyComponent } from "./ui/mailverify/mailverify.component";
import {MywalletComponent } from "./ui/mywallet/mywallet.component";
import {SettingsComponent } from "./ui/settings/settings.component";
import {PaymentComponent } from "./ui/payment/payment.component";
import {MarketcapComponent } from "./ui/marketcap/marketcap.component";
import {ExchangeComponent } from "./ui/exchange/exchange.component";
import {TradeComponent } from "./ui/trade/trade.component";
import {UnauthorisedComponent } from "./ui/unauthorised/unauthorised.component";
import { KycindividualresubmitComponent } from './ui/account/kycindividualresubmit/kycindividualresubmit.component';
import { KycCorporateResumitComponent } from './ui/account/kyc-corporate-resumit/kyc-corporate-resumit.component';
import { KycindividualComponent } from './ui/account/kycindividual/kycindividual.component';
import { KycCorporateComponent } from './ui/account/kyc-corporate/kyc-corporate.component';
import { ResetpasswordComponent } from './ui/resetpassword/resetpassword.component';
import { ConfirmationComponent} from './ui/confirmation/confirmation.component'
import{ AuthorisedComponent} from './ui/authorised/authorised.component'


const routes: Routes = [
  { path:'register',component:RegisterComponent },
  { path:'login',component:LoginComponent },
  { path:'forgot',component:ForgotComponent },
  { path:'verify/:auth',component:VerifyComponent },
  { path:'',component:HomeComponent},
  { path:'home',component:HomeComponent},
  { path:'dashboard',component:DashboardComponent},
  { path:'account',component:AccountComponent},
  { path:'mailverify/:email',component:MailverifyComponent},
  {path:'mywallet', component:MywalletComponent},
  {path:'settings', component:SettingsComponent},
  {path:'payment', component:PaymentComponent},
  {path:'marketcap', component:MarketcapComponent},
  {path:'exchange', component:ExchangeComponent},
  {path:'trade', component:TradeComponent},
  {path:'account/kyc', component:KycindividualComponent},
  {path:'account/kycresubmit', component:KycindividualresubmitComponent},
  {path:'account/kyccorporateresubmit', component:KycCorporateResumitComponent},
  {path:'unauthorised/:email', component:UnauthorisedComponent},
  {path:'account/kycCorporate', component:KycCorporateComponent},
  {path:'resetpassword/:id', component:ResetpasswordComponent},
  {path:'confirmation/:id',component:ConfirmationComponent},
  {path:'authorized/:id',component:AuthorisedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]

})
export class AppRoutingModule { }


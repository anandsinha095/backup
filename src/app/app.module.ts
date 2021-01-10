import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavbarModule,CollapseModule, DropdownModule, WavesModule,TableModule,MDBBootstrapModule} from 'angular-bootstrap-md';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { ForgotComponent } from './ui/forgot/forgot.component';
import { VerifyComponent } from './ui/verify/verify.component';
import { HomeComponent } from './ui/home/home.component';
import { NavComponent } from './ui/nav/nav.component';
import { FooterComponent } from './ui/footer/footer.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { AccountComponent } from "./ui/account/AccountComponent";
import { MailverifyComponent } from './ui/mailverify/mailverify.component';
import { MywalletComponent } from './ui/mywallet/mywallet.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './ui/settings/settings.component';
import { PaymentComponent } from './ui/payment/payment.component';
import { MarketcapComponent } from './ui/marketcap/marketcap.component';
import { ExchangeComponent } from './ui/exchange/exchange.component';
import { TradeComponent } from './ui/trade/trade.component';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule, InputsModule, } from 'angular-bootstrap-md';
import { KycindividualComponent } from './ui/account/kycindividual/kycindividual.component';
import { ChangepasswordComponent } from './ui/account/changepassword/changepassword.component';
import { UnauthorisedComponent } from './ui/unauthorised/unauthorised.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {FilterPipe} from './common/filter.pipe';
import { ResetpasswordComponent } from './ui/resetpassword/resetpassword.component';
import { ConfirmationComponent } from './ui/confirmation/confirmation.component';
import { AuthorisedComponent } from './ui/authorised/authorised.component';/* pipe */
import { NgxSpinnerModule } from 'ngx-spinner';
import { KycCorporateComponent } from './ui/account/kyc-corporate/kyc-corporate.component';
import { KycindividualresubmitComponent } from './ui/account/kycindividualresubmit/kycindividualresubmit.component';
import { KycCorporateResumitComponent } from './ui/account/kyc-corporate-resumit/kyc-corporate-resumit.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ClipboardModule } from 'ngx-clipboard';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,

    VerifyComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    AccountComponent,
    MailverifyComponent,
    MywalletComponent,
    SettingsComponent,
    PaymentComponent,
    MarketcapComponent,
    ExchangeComponent,
    TradeComponent,
    KycindividualComponent,
    ChangepasswordComponent,
    KycCorporateComponent,
    UnauthorisedComponent,
    FilterPipe,
    ResetpasswordComponent,
    ConfirmationComponent,
    AuthorisedComponent,
    KycCorporateComponent,
    KycindividualresubmitComponent,
    KycCorporateResumitComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    WavesModule.forRoot(),
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
    TableModule,
    NavbarModule, 
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    ButtonsModule,
    MatDatepickerModule,
    InputsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    ClipboardModule,
    MatSelectModule,
    MatInputModule,
   ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
}) 
export class AppModule { }

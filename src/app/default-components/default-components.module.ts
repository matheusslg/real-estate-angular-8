import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  declarations: [
    PageNotFoundComponent, 
    LoadingComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    MDBBootstrapModule,
    BsDropdownModule,
    LoadingComponent
  ],
})
export class DefaultComponentsModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";

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
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  declarations: [],
  exports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule
  ],
})
export class DefaultComponentsModule { }

import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadFilesThumbnailDirective } from '../directives/upload-files-thumbnail.directive';
import { DataTablesModule } from 'angular-datatables';
import { NgxEditorModule } from 'ngx-editor';
import { SwitchComponent } from './switch/switch.component';

registerLocaleData(localePT);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

export const ngxMaskModuleOptions: Partial<IConfig> | (() => Partial<IConfig>) = {};

export const toastrOptions = {
  timeOut: 3000,
  autoDismiss: true,
  preventDuplicates: true
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgSelectModule,
    NgxMaskModule.forRoot(ngxMaskModuleOptions),
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrOptions),
    FileUploadModule,
    DataTablesModule,
    NgxEditorModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  declarations: [
    PageNotFoundComponent,
    LoadingComponent,
    UploadFilesComponent,
    UploadFilesThumbnailDirective,
    SwitchComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgSelectModule,
    NgxMaskModule,
    MDBBootstrapModule,
    BsDropdownModule,
    LoadingComponent,
    UploadFilesComponent,
    BrowserAnimationsModule,
    ToastrModule,
    FileUploadModule,
    DataTablesModule,
    NgxEditorModule,
    SwitchComponent
  ],
})
export class DefaultComponentsModule { }

import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTablesModule } from 'angular-datatables';
import { NgxEditorModule } from 'ngx-editor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { SlideshowModule } from 'ng-simple-slideshow';
import { AgmCoreModule } from '@agm/core';
import { NgxSliderMobyModule } from 'ngx-slider-moby';

// Components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { SwitchComponent } from './switch/switch.component';

// Directives
import { UploadFilesThumbnailDirective } from '../b2c/directives/upload-files-thumbnail.directive';

// Pipes
import { TruncatePipe } from '../b2c/pipes/truncate.pipe';
import { NormalizeStringPipe } from '../b2c/pipes/normalize-string.pipe';
import { SearchPropertyPipe } from '../b2c/pipes/search-property.pipe';

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
    NgxEditorModule,
    DragDropModule,
    InfiniteScrollModule,
    NgxGalleryModule,
    DeviceDetectorModule.forRoot(),
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: environment.keys.googleMaps
    }),
    NgxSliderMobyModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    NormalizeStringPipe,
    SearchPropertyPipe
  ],
  declarations: [
    PageNotFoundComponent,
    LoadingComponent,
    UploadFilesComponent,
    UploadFilesThumbnailDirective,
    TruncatePipe,
    NormalizeStringPipe,
    SearchPropertyPipe,
    SwitchComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
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
    SwitchComponent,
    DragDropModule,
    TruncatePipe,
    NormalizeStringPipe,
    SearchPropertyPipe,
    InfiniteScrollModule,
    NgxGalleryModule,
    DeviceDetectorModule,
    SlideshowModule,
    AgmCoreModule,
    NgxSliderMobyModule
  ],
})
export class DefaultComponentsModule { }

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefaultComponentsModule } from './default-components/default-components.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Globals } from './globals';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './admin/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    AdminModule,
    AppRoutingModule,
    DefaultComponentsModule,
    HomeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    Globals,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

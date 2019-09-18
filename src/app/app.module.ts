import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefaultComponentsModule } from './default-components/default-components.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Globals } from './globals';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    AdminModule,
    AppRoutingModule,
    DefaultComponentsModule,
    HomeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

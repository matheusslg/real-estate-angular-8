import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefaultComponentsModule } from '../default-components/default-components.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HomeComponent } from './home/home.component';
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';
import { TopSidebarComponent } from './top-sidebar/top-sidebar.component';

@NgModule({
  imports: [
    DefaultComponentsModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  declarations: [
    HomeComponent,
    PropertiesListComponent,
    TopSidebarComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    HomeComponent,
    PropertiesListComponent
  ]
})

export class HomeModule { }
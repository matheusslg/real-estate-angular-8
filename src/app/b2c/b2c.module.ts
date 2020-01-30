import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponentsModule } from '../default-components/default-components.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { B2cRoutingModule } from './b2c-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PropertiesListComponent } from './components/properties/properties-list/properties-list.component';
import { TopSidebarComponent } from './components/top-sidebar/top-sidebar.component';
import { PropertiesSingleComponent } from './components/properties/properties-single/properties-single.component';
import { FooterComponent } from './components/footer/footer.component';
import { CloseMobileMenuDirective } from './directives/close-mobile-menu.directive';
import { PropertiesSearchComponent } from './components/properties/properties-search/properties-search.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultComponentsModule,
    B2cRoutingModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  declarations: [
    HomeComponent,
    PropertiesListComponent,
    PropertiesSingleComponent,
    TopSidebarComponent,
    FooterComponent,
    CloseMobileMenuDirective,
    PropertiesSearchComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    HomeComponent,
    PropertiesListComponent
  ]
})

export class B2cModule { }
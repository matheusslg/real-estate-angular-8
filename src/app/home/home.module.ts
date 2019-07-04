import { NgModule } from '@angular/core';
import { DefaultComponentsModule } from '../default-components/default-components.module';

import { HomeComponent } from './home/home.component';
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';

@NgModule({
  imports: [
    DefaultComponentsModule,
  ],
  providers: [],
  declarations: [
    HomeComponent,
    PropertiesListComponent
  ],
  exports: [
    HomeComponent,
    PropertiesListComponent
  ]
})

export class HomeModule { }
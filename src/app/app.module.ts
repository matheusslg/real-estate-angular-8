import { NgModule } from '@angular/core';
import { DefaultComponentsModule } from './default-components/default-components.module';
import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    DefaultComponentsModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

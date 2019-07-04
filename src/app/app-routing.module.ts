import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesListComponent } from './home/properties/properties-list/properties-list.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'propriedades', component: PropertiesListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
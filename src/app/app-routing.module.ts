import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'propriedades' },
  { path: 'propriedades', component: PropertiesListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
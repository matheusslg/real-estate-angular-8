import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './b2c/components/home/home.component';
import { PageNotFoundComponent } from './default-components/page-not-found/page-not-found.component';
import { PropertiesListComponent } from './b2c/components/properties/properties-list/properties-list.component';
import { PropertiesSingleComponent } from './b2c/components/properties/properties-single/properties-single.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'propriedades', component: PropertiesListComponent },
      { path: 'propriedades/:id/detalhes', component: PropertiesSingleComponent },
      { path: '', pathMatch: 'full', redirectTo: 'propriedades' },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
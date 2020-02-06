import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './b2c/components/home/home.component';
import { PageNotFoundComponent } from './default-components/page-not-found/page-not-found.component';
import { PropertiesListComponent } from './b2c/components/properties/properties-list/properties-list.component';
import { PropertiesSingleComponent } from './b2c/components/properties/properties-single/properties-single.component';
import { PropertiesSearchComponent } from './b2c/components/properties/properties-search/properties-search.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: PropertiesListComponent },
      { path: 'imoveis/:id', component: PropertiesSingleComponent },
      { path: 'buscar', component: PropertiesSearchComponent },
      { path: 'buscar/:term', component: PropertiesSearchComponent },
      { path: 'categoria/:description', component: PropertiesListComponent },
      { path: 'localizacao/:description', component: PropertiesListComponent },
      { path: 'modalidade/:description', component: PropertiesListComponent },
      { path: 'cidade/:description', component: PropertiesListComponent },
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './b2c/components/home/home.component';
import { PageNotFoundComponent } from './default-components/page-not-found/page-not-found.component';
import { PropertiesHomeComponent } from './b2c/components/properties/properties-home/properties-home.component';
import { PropertiesSingleComponent } from './b2c/components/properties/properties-single/properties-single.component';
import { PropertiesSearchComponent } from './b2c/components/properties/properties-search/properties-search.component';
import { PropertiesFilteringComponent } from './b2c/components/properties/properties-filtering/properties-filtering.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: PropertiesHomeComponent },
      { path: 'imoveis/:id', component: PropertiesSingleComponent },
      { path: 'buscar', component: PropertiesSearchComponent },
      { path: 'buscar/:term', component: PropertiesSearchComponent },
      { path: 'categoria/:description', component: PropertiesFilteringComponent },
      { path: 'localizacao/:description', component: PropertiesFilteringComponent },
      { path: 'modalidade/:description', component: PropertiesFilteringComponent },
      { path: 'cidade/:description', component: PropertiesFilteringComponent },
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
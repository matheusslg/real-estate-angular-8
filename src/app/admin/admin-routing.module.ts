import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertiesPostComponent } from './components/properties/properties-post/properties-post.component';
import { PropertiesListComponent } from './components/properties/properties-list/properties-list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoriesPostComponent } from './components/categories/categories-post/categories-post.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationsListComponent } from './components/locations/locations-list/locations-list.component';
import { LocationsPostComponent } from './components/locations/locations-post/locations-post.component';
import { TypesComponent } from './components/types/types.component';
import { TypesListComponent } from './components/types/types-list/types-list.component';
import { TypesPostComponent } from './components/types/types-post/types-post.component';
import { SlugTypesComponent } from './components/slug-types/slug-types.component';
import { SlugTypesListComponent } from './components/slug-types/slug-types-list/slug-types-list.component';
import { SlugTypesPostComponent } from './components/slug-types/slug-types-post/slug-types-post.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CitiesListComponent } from './components/cities/cities-list/cities-list.component';
import { CitiesPostComponent } from './components/cities/cities-post/cities-post.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: 'area-logada', component: DashboardComponent, canActivateChild: [AdminGuard],
    children: [
      { path: 'painel', component: HomeAdminComponent },
      {
        path: 'imoveis', component: PropertiesComponent,
        children: [
          { path: 'listagem', component: PropertiesListComponent },
          { path: 'cadastrar', component: PropertiesPostComponent },
          { path: 'editar/:id', component: PropertiesPostComponent },
          { path: '', redirectTo: 'listagem', pathMatch: 'full' }
        ]
      },
      {
        path: 'categorias', component: CategoriesComponent,
        children: [
          { path: 'listagem', component: CategoriesListComponent },
          { path: 'cadastrar', component: CategoriesPostComponent },
          { path: 'editar/:id', component: CategoriesPostComponent },
          { path: '', redirectTo: 'listagem', pathMatch: 'full' }
        ]
      },
      {
        path: 'localizacoes', component: LocationsComponent,
        children: [
          { path: 'listagem', component: LocationsListComponent },
          { path: 'cadastrar', component: LocationsPostComponent },
          { path: 'editar/:id', component: LocationsPostComponent },
          { path: '', redirectTo: 'listagem', pathMatch: 'full' }
        ]
      },
      {
        path: 'modalidades', component: TypesComponent,
        children: [
          { path: 'listagem', component: TypesListComponent },
          { path: 'cadastrar', component: TypesPostComponent },
          { path: 'editar/:id', component: TypesPostComponent },
          { path: '', redirectTo: 'listagem', pathMatch: 'full' }
        ]
      },
      {
        path: 'cidades', component: CitiesComponent,
        children: [
          { path: 'listagem', component: CitiesListComponent },
          { path: 'cadastrar', component: CitiesPostComponent },
          { path: 'editar/:id', component: CitiesPostComponent },
          { path: '', redirectTo: 'listagem', pathMatch: 'full' }
        ]
      },
      {
        path: 'slugs', component: SlugTypesComponent,
        children: [
          { path: 'listagem', component: SlugTypesListComponent },
          { path: 'cadastrar', component: SlugTypesPostComponent },
          { path: 'editar/:id', component: SlugTypesPostComponent },
          { path: '', redirectTo: 'listagem', pathMatch: 'full' }
        ]
      },
      { path: 'usuarios', component: UsersAdminComponent },
      { path: '', redirectTo: 'painel', pathMatch: 'full' }
    ]
  },
  { path: 'sair', pathMatch: 'full', component: LogoutComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
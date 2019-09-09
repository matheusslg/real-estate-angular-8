import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertiesPostComponent } from './components/properties/properties-post/properties-post.component';
import { PropertiesListComponent } from './components/properties/properties-list/properties-list.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'area-logada', component: DashboardComponent, canActivateChild: [AdminGuard], 
    children: [
        { path: 'painel', component: HomeAdminComponent },
        { path: 'propriedades', component: PropertiesComponent, 
          children: [
            { path: 'listagem', component: PropertiesListComponent },
            { path: 'cadastrar', component: PropertiesPostComponent },
            { path: '', redirectTo: 'listagem', pathMatch: 'full' }
          ]
        },
        { path: 'usuarios', component: UsersAdminComponent },
        { path: '', redirectTo: 'painel', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
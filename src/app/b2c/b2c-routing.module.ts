import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesSingleComponent } from './components/properties/properties-single/properties-single.component';
import { PropertiesListComponent } from './components/properties/properties-list/properties-list.component';

const routes: Routes = [
    /*{ path: 'teste', component: PropertiesSingleComponent },
    {
        path: 'imoveis', component: PropertiesListComponent,
        children: [
            { path: ':id', component: PropertiesSingleComponent },
            { path: '', redirectTo: '', pathMatch: 'full' }
        ]
    },*/
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class B2cRoutingModule { }
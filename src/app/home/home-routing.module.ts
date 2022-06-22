import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TRAVELS_LIST_MODULE_URL } from '../core/constants';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: TRAVELS_LIST_MODULE_URL,
        loadChildren: () => import('./travel-list/travel-list.module').then(m => m.TravelListModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

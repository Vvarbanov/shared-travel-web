import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelListComponent } from './travel-list.component';

const routes: Routes = [
    { path: '', component: TravelListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TravelListRoutingModule { }

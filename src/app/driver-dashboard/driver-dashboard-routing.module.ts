import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverDashboardComponent } from './driver-dashboard.component';
import { CreateTravelComponent } from './create-travel/create-travel.component';

const routes: Routes = [
    { path: '', component: DriverDashboardComponent },
    { path: 'create', component: CreateTravelComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriverDashboardRoutingModule { }

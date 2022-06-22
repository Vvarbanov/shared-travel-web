import { NgModule } from '@angular/core';
import { DriverDashboardComponent } from './driver-dashboard.component';
import { MaterialModule } from '../core/material/material.module';
import { DriverDashboardRoutingModule } from './driver-dashboard-routing.module';
import { CreateTravelComponent } from './create-travel/create-travel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FromStepComponent } from './create-travel/steps-components/from-step/from-step.component';
import { HomeModule } from '../home/home.module';
import { ToStepComponent } from './create-travel/steps-components/to-step/to-step.component';
import { DepartureStepComponent } from './create-travel/steps-components/departure-step/departure-step.component';
import { ReviewStepComponent } from './create-travel/steps-components/review-step/review-step.component';
import { DriverTravelHistoryComponent } from './driver-travel-history/driver-travel-history.component';

@NgModule({
    imports: [
        DriverDashboardRoutingModule,
        MaterialModule,
        HomeModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DriverDashboardComponent,
        CreateTravelComponent,
        FromStepComponent,
        ToStepComponent,
        DepartureStepComponent,
        ReviewStepComponent,
        DriverTravelHistoryComponent
    ]
})
export class DriverDashboardModule { }

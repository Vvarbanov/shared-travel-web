import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../core/material/material.module';
import { LocationTranslatePipeModule } from '../core/services/pipes/location-translate.pipe';
import { HomeModule } from '../home/home.module';
import { CreateTravelComponent } from './create-travel/create-travel.component';
import { DepartureStepComponent } from './create-travel/steps-components/departure-step/departure-step.component';
import { FromStepComponent } from './create-travel/steps-components/from-step/from-step.component';
import { ReviewStepComponent } from './create-travel/steps-components/review-step/review-step.component';
import { ToStepComponent } from './create-travel/steps-components/to-step/to-step.component';
import { DriverDashboardRoutingModule } from './driver-dashboard-routing.module';
import { DriverDashboardComponent } from './driver-dashboard.component';

@NgModule({
    imports: [
        DriverDashboardRoutingModule,
        MaterialModule,
        HomeModule,
        ReactiveFormsModule,
        LocationTranslatePipeModule,
    ],
    declarations: [
        DriverDashboardComponent,
        CreateTravelComponent,
        FromStepComponent,
        ToStepComponent,
        DepartureStepComponent,
        ReviewStepComponent,
    ]
})
export class DriverDashboardModule { }

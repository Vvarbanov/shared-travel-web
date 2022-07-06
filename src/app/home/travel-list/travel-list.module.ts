import { NgModule } from '@angular/core';

import { MaterialModule } from '../../core/material/material.module';
import { LocationTranslatePipeModule } from '../../core/services/pipes/location-translate.pipe';
import { HomeModule } from '../home.module';
import { TravelListCardComponent } from './travel-list-card/travel-list-card.component';
import { TravelListRoutingModule } from './travel-list-routing.module';
import { TravelListComponent } from './travel-list.component';

@NgModule({
    declarations: [
        TravelListComponent,
        TravelListCardComponent,
    ],
    imports: [
        TravelListRoutingModule,
        MaterialModule,
        HomeModule,
        LocationTranslatePipeModule,
    ]
})
export class TravelListModule { }

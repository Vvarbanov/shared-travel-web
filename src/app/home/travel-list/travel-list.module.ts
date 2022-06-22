import { NgModule } from '@angular/core';
import { TravelListComponent } from './travel-list.component';
import { MaterialModule } from '../../core/material/material.module';
import { TravelListRoutingModule } from './travel-list-routing.module';
import { TravelListCardComponent } from './travel-list-card/travel-list-card.component';
import { HomeModule } from '../home.module';

@NgModule({
    declarations: [
        TravelListComponent,
        TravelListCardComponent,
    ],
    imports: [
        TravelListRoutingModule,
        MaterialModule,
        HomeModule
    ]
})
export class TravelListModule { }

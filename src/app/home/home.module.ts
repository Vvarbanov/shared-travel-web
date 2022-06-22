import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FindTravelComponent } from './find-travel/find-travel.component';
import { MaterialModule } from '../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TravelHistoryComponent } from './travel-history/travel-history.component';
import { TravelHistoryCardComponent } from './travel-history/travel-history-card/travel-history-card.component';
import { LocationAutocompleteInputComponent } from './find-travel/location-autocomplete-input/location-autocomplete-input.component';

@NgModule({
    declarations: [
        HomeComponent,
        FindTravelComponent,
        TravelHistoryComponent,
        TravelHistoryCardComponent,
        LocationAutocompleteInputComponent,
    ],
    imports: [
        HomeRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        FindTravelComponent,
        LocationAutocompleteInputComponent,
        TravelHistoryCardComponent,
    ]
})
export class HomeModule { }

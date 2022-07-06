import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { LocationTranslatePipeModule } from '../core/services/pipes/location-translate.pipe';
import { FindTravelComponent } from './find-travel/find-travel.component';
import { LocationAutocompleteInputComponent } from './find-travel/location-autocomplete-input/location-autocomplete-input.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TravelHistoryCardComponent } from './travel-history/travel-history-card/travel-history-card.component';
import { TravelHistoryListComponent } from './travel-history/travel-history-list/travel-history-list.component';
import { TravelHistoryContainerComponent } from './travel-history/travel-history-container.component';

@NgModule({
    declarations: [
        HomeComponent,
        FindTravelComponent,
        TravelHistoryListComponent,
        TravelHistoryCardComponent,
        TravelHistoryContainerComponent,
        LocationAutocompleteInputComponent,
    ],
    imports: [
        HomeRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        LocationTranslatePipeModule,
    ],
    exports: [
        FindTravelComponent,
        LocationAutocompleteInputComponent,
        TravelHistoryCardComponent,
        TravelHistoryContainerComponent,
    ]
})
export class HomeModule { }

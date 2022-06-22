import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { LocationAutocompleteInputComponent } from './location-autocomplete-input.component';

describe('LocationAutocompleteInputComponent', () => {
    let component: LocationAutocompleteInputComponent;
    let fixture: ComponentFixture<LocationAutocompleteInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatAutocompleteModule],
            declarations: [LocationAutocompleteInputComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationAutocompleteInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

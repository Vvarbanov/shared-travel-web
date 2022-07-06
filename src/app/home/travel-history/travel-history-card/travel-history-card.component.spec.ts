/* tslint:disable:no-unused-variable */
import { DatePipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { travelMock } from '../../../core/mocks/travel.mock';
import { LocationTranslatePipeModule } from '../../../core/services/pipes/location-translate.pipe';
import { TravelHistoryCardComponent } from './travel-history-card.component';

describe('TravelHistoryCardComponent', () => {
    let component: TravelHistoryCardComponent;
    let fixture: ComponentFixture<TravelHistoryCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [LocationTranslatePipeModule],
            providers: [
                { provide: DatePipe, useValue: new DatePipe('en') }
            ],
            declarations: [TravelHistoryCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TravelHistoryCardComponent);
        component = fixture.componentInstance;
        component.travel = travelMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

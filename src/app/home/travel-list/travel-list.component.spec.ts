/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelListComponent } from './travel-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from 'src/app/profile/services/profile.service';

describe('TravelListComponent', () => {
    let component: TravelListComponent;
    let fixture: ComponentFixture<TravelListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TravelListComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile']);
        profileServiceSpy.getProfile.and.returnValue({});

        TestBed.configureTestingModule({
            providers: [{
                provide: ProfileService,
                useValue: profileServiceSpy
            }]
        });

        fixture = TestBed.createComponent(TravelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

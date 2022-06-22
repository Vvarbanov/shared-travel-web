/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileSmallComponent } from './profile-small.component';
import { Profile } from '../../../profile/models/profile.model';

describe('ProfileSmallComponent', () => {
    let component: ProfileSmallComponent;
    let fixture: ComponentFixture<ProfileSmallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileSmallComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSmallComponent);
        component = fixture.componentInstance;
        component.profile = { firstName: '', lastName: '', id: 0, email: '', profileSettings: { id: 0, emailVisible: false } };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

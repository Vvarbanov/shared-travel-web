/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyProfileComponent } from './my-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from '../services/profile.service';
import { MatDialog } from '@angular/material/dialog';

describe('MyProfileComponent', () => {
    let component: MyProfileComponent;
    let fixture: ComponentFixture<MyProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MyProfileComponent],
            providers: [
                { provide: MatDialog, useValue: {} }
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
        fixture = TestBed.createComponent(MyProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

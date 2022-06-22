/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileEditableFieldComponent } from './profile-editable-field.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('ProfileEditableFieldComponent', () => {
    let component: ProfileEditableFieldComponent;
    let fixture: ComponentFixture<ProfileEditableFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [ProfileEditableFieldComponent],
            providers: [
                { provide: MatDialog, useValue: {} }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileEditableFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

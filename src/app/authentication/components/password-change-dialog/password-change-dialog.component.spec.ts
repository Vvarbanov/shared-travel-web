/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PasswordChangeDialogComponent } from './password-change-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

describe('PasswordChangeDialogComponent', () => {
    let component: PasswordChangeDialogComponent;
    let fixture: ComponentFixture<PasswordChangeDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [PasswordChangeDialogComponent],
            providers: [
                { provide: MatDialog, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordChangeDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

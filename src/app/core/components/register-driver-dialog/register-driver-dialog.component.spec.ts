import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterDriverDialogComponent } from './register-driver-dialog.component';

describe('RegisterDriverDialogComponent', () => {
    let component: RegisterDriverDialogComponent;
    let fixture: ComponentFixture<RegisterDriverDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatDialogModule,
                HttpClientTestingModule,
                RouterTestingModule
            ], providers: [
                { provide: MatDialogRef, useValue: {} }
            ],
            declarations: [RegisterDriverDialogComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterDriverDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DriverGuard } from './driver.guard';

describe('DriverGuard', () => {
    let guard: DriverGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatDialogModule
            ]
        });
        guard = TestBed.inject(DriverGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});

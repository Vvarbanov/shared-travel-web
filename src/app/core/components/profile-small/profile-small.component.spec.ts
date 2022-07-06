/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { profileMock } from '../../mocks/profile.mock';
import { ProfileSmallComponent } from './profile-small.component';

describe('ProfileSmallComponent', () => {
    let component: ProfileSmallComponent;
    let fixture: ComponentFixture<ProfileSmallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ProfileSmallComponent],
            providers: [
                { provide: MatDialog, useValue: {} },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSmallComponent);
        component = fixture.componentInstance;
        component.profile = profileMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

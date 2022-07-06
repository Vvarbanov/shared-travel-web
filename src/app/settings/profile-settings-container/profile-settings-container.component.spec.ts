/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSettingsContainerComponent } from './profile-settings-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileSettingsContainerComponent', () => {
    let component: ProfileSettingsContainerComponent;
    let fixture: ComponentFixture<ProfileSettingsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ProfileSettingsContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSettingsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
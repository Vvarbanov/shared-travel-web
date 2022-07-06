/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingBooleanRowComponent } from './setting-boolean-row.component';

describe('SettingBooleanRowComponent', () => {
    let component: SettingBooleanRowComponent;
    let fixture: ComponentFixture<SettingBooleanRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingBooleanRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingBooleanRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

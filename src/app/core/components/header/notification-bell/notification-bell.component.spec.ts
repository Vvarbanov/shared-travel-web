/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotificationBellComponent } from './notification-bell.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificationBellComponent', () => {
    let component: NotificationBellComponent;
    let fixture: ComponentFixture<NotificationBellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, HttpClientTestingModule],
            declarations: [NotificationBellComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationBellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

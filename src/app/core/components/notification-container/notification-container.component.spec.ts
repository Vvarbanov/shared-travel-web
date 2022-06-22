/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotificationContainerComponent } from './notification-container.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('NotificationContainerComponent', () => {
    let component: NotificationContainerComponent;
    let fixture: ComponentFixture<NotificationContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ScrollingModule],
            declarations: [NotificationContainerComponent],
            providers: [
                { provide: MatDialog, useValue: {} },
                { provide: DatePipe, useValue: new DatePipe('en') }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

/* tslint:disable:no-unused-variable */
import { ElementRef } from '@angular/core';
import { inject, async, TestBed } from '@angular/core/testing';
import { NumberDirective } from './numbers-only.directive';
import { MockElementRef } from '../../mocks/mock-element-ref.mock';

describe('Directive: NumberDirective', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ElementRef, useClass: MockElementRef }
            ]
        }).compileComponents();
    }));

    it('should create an instance', inject([ElementRef], (_el: ElementRef) => {
        const directive = new NumberDirective(_el);
        expect(directive).toBeTruthy();
    }));
});

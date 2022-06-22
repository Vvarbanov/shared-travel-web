/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BoldTextPipe } from './bold-text.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('Pipe: BoldTexte', () => {
    it('create an instance', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
        const pipe = new BoldTextPipe(sanitizer);
        expect(pipe).toBeTruthy();
    }));
});

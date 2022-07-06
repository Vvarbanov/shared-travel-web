/* tslint:disable:no-unused-variable */
import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { BoldTextPipe } from './bold-text.pipe';

describe('Pipe: BoldTexte', () => {
    it('create an instance', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
        const pipe = new BoldTextPipe(sanitizer);
        expect(pipe).toBeTruthy();
    }));
});

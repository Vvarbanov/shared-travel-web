import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'boldText'
})
export class BoldTextPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string): string | null {
        const regex = /[\*][^\*]*[\*]/g;
        return this.sanitize(this.replace(value, regex));
    }

    replace(value: string, regex: RegExp): string {
        const matched = value.match(regex);
        matched?.forEach(foundString => {
            foundString = foundString.substring(1, foundString.length - 1);
            value = value.replace(`*${ foundString }*`, `<b>${ foundString }</b>`);
        });

        return value;
    }

    sanitize(value: string): string | null {
        return this.sanitizer.sanitize(SecurityContext.HTML, value);
    }
}
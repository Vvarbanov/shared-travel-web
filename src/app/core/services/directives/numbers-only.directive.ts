import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: 'input[appNumbersOnly]'
})
export class NumberDirective {
    // If undefined this will resolve to an empty string: ''
    @Input()
    appNumbersOnly!: string | boolean;

    @Output()
    valueChange = new EventEmitter();

    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }): void {
        if (typeof this.appNumbersOnly === 'boolean' && !this.appNumbersOnly) return;

        const initalValue = this._el.nativeElement.value;
        const newValue = initalValue.replace(/[^0-9]*/g, '');
        this._el.nativeElement.value = newValue;
        this.valueChange.emit(newValue);
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
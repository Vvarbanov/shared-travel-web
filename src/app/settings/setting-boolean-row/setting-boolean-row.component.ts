import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-setting-boolean-row',
    templateUrl: './setting-boolean-row.component.html',
    styleUrls: ['./setting-boolean-row.component.scss']
})
export class SettingBooleanRowComponent {
    @Input() title: string;
    @Input() description: string;
    @Input() checked: boolean;

    @Output() toggleEvent = new EventEmitter<boolean>();

    constructor() {
        this.title = '';
        this.description = '';
        this.checked = false;
    }

    toggle(checked: boolean): void {
        this.toggleEvent.emit(checked);
    }
}

import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Language } from './model/language.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private availableLanguages: Language[];

    constructor(
        @Inject(LOCALE_ID) private localeId: string,
        private router: Router
    ) {
        this.availableLanguages = [];
        this.addLanguage($localize`:@@language-name-english:English`, 'en');
        this.addLanguage($localize`:@@language-name-bulgarian:Bulgarian`, 'bg');
    }

    private addLanguage(name: string, code: string): void {
        this.availableLanguages.push({
            displayName: name,
            code: code,
            disabled: this.localeId === code
        });
    }

    getLanguages(): Language[] {
        return this.availableLanguages;
    }

    getLanguageUrl(code: string): string {
        return `/${ code }${ this.getCurrentRoute() }`;
    }

    private getCurrentRoute(): string {
        return this.router.url;
    }
}

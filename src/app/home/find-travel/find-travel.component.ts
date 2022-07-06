import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Page } from '../../core/models/page.model';
import { Travel } from '../travel-list/models/travel.model';
import { FindTravelService } from './services/find-travel.service';
import { Router } from '@angular/router';
import { TRAVELS_LIST_ROUTER_URL } from '../../core/constants';
import { TravelFilter } from './models/travel-filter.model';
import { LocationAutocompleteInputComponent } from './location-autocomplete-input/location-autocomplete-input.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-find-travel',
    templateUrl: './find-travel.component.html',
    styleUrls: ['./find-travel.component.scss'],
})
export class FindTravelComponent implements OnDestroy {
    formData: FormGroup;
    subscriptions: Subscription = new Subscription();

    travels: Page<Travel> | undefined;

    @ViewChild('fromComponent') fromComponent: LocationAutocompleteInputComponent | undefined;
    @ViewChild('toComponent') toComponent: LocationAutocompleteInputComponent | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private findTravelService: FindTravelService,
        private snackBar: MatSnackBar,
    ) {
        this.formData = this.formBuilder.group({
            from: ['', [Validators.required]],
            to: ['', [Validators.required]],
            departureDate: [new Date(), [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    updateField(value: string, name: string): void {
        this.formData.controls[name]?.setValue(value);
    }

    updateFields(filter: TravelFilter): void {
        // Used set timeout to asynchronously update the values and avoid change detection problems
        setTimeout(() => {
            this.formData.controls['departureDate']?.patchValue(filter.departureDate);

            this.updateLocations(filter.from, filter.to);
        }, 0);
    }

    private updateLocations(from: string, to: string): void {
        this.fromComponent?.updateValue(from);
        this.toComponent?.updateValue(to);
    }

    submit(): void {
        this.findTravelService.findTravels(this.formData.value).subscribe({
            next: res => {
                if (res.content.length) {
                    this.router.navigate([TRAVELS_LIST_ROUTER_URL], {
                        queryParams: { from: this.formData.value.from, to: this.formData.value.to, startDateTime: this.formData.value.departureDate.valueOf() }
                    });
                } else {
                    this.snackBar.open($localize`:@@find-travel.snackbar.empty:Travels matching provided filter not found!`,
                        $localize`:@@snackbar.close:Close`, {
                        duration: 3000
                    });
                }
            }, error: e => console.error(e)
        });
    }
}

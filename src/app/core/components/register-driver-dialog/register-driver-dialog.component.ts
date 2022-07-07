import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Events } from '../../models/events.model';
import { EventBrokerService } from '../../services/events/event-broker.service';
import { RegisterAsDriverRequest } from './models/register-driver-request.model';

@Component({
    selector: 'app-register-driver-dialog',
    templateUrl: './register-driver-dialog.component.html',
    styleUrls: ['./register-driver-dialog.component.scss']
})
export class RegisterDriverDialogComponent implements OnInit, OnDestroy {

    private subscriptions = new Subscription();
    private sentRequest = false;

    formGroup: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<RegisterDriverDialogComponent>,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private eventService: EventBrokerService
    ) {
        this.formGroup = this.formBuilder.group({
            make: ['', [Validators.required, Validators.maxLength(50)]],
            model: ['', [Validators.required, Validators.maxLength(100)]],
            seats: ['', [Validators.required, Validators.maxLength(2)]]
        });
    }

    ngOnInit(): void {
        this.subscriptions.add(this.eventService.getEvent(Events.loginSuccessful)?.subscribe(() => {
            if (this.sentRequest) {
                this.dialogRef.close();
            }
        }));

        this.subscriptions.add(this.authenticationService.authErrorObs.subscribe(authError => {
            this.formGroup.setErrors({ authError });
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    registerAsDriver(registerDriverRequest: RegisterAsDriverRequest): void {
        this.sentRequest = true;
        this.authenticationService.registerAsDriver(registerDriverRequest);
    }
}

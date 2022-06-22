import { Component, Input, OnInit } from '@angular/core';
import { Travel } from '../models/travel.model';
import { TravelHttpService } from '../../../core/services/http/travel-http.service';
import { Profile } from 'src/app/profile/models/profile.model';
import { RedirectService } from 'src/app/core/services/redirects/redirect.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TravelParticipantRole } from './models/travel-participant-role.enum';
import { NotificationHttpService } from 'src/app/core/services/http/notification-http.service';

@Component({
    selector: 'app-travel-list-card',
    templateUrl: './travel-list-card.component.html',
    styleUrls: ['./travel-list-card.component.scss']
})
export class TravelListCardComponent implements OnInit {
    @Input() travel: Travel | undefined;
    @Input() profile: Profile | undefined;

    Role: typeof TravelParticipantRole = TravelParticipantRole;

    role: TravelParticipantRole = TravelParticipantRole.NONE;
    status: string = "";

    constructor(
        private travelHttpService: TravelHttpService,
        private notificationHttpService: NotificationHttpService,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.setCanJoin();
    }

    requestJoinTravel(): void {
        this.travelHttpService.requestJoinTravel(this.travel!.id).subscribe({
            next: () => {
                this.snackBar.open($localize`:@@travel-list-card.snackbar.successfull-application:Successful travel application!`, $localize`:@@travel-list-card.snackbar.close:Close`, {
                    duration: 3000
                });

                this.setUserApplicant();
            }, error: e => console.error(e)
        });
    }

    cancelJoinRequest(): void {
        this.notificationHttpService.cancelJoinRequest(this.travel!.id).subscribe({
            next: () => {
                this.snackBar.open($localize`:@@travel-list-card.snackbar.successfull-cancel-application:Successfully canceled application!`, $localize`:@@travel-list-card.snackbar.close:Close`, {
                    duration: 3000
                });

                this.setUserNone();
            }, error: e => console.error(e)
        });
    }

    leaveTravel(): void {
        this.travelHttpService.leaveTravel(this.travel!.id).subscribe({
            next: () => {
                this.snackBar.open($localize`:@@travel-list-card.snackbar.successfull-leave-travel:Successfully left the travel!`, $localize`:@@travel-list-card.snackbar.close:Close`, {
                    duration: 3000
                });

                this.setUserNone();
            }, error: e => console.error(e)
        });
    }

    private setCanJoin(): void {
        if (this.travel!.driver.id === this.profile?.id) {
            this.setUserDriver();
            return;
        }

        if (this.travel!.passengers.find(passenger => passenger.id === this.profile?.id)) {
            this.setUserPassenger();
            return;
        }

        if (this.travel!.applied) {
            this.setUserApplicant();
        }

    }

    private setUserDriver(): void {
        this.role = TravelParticipantRole.DRIVER;
        this.status = $localize`:@@travel-list-card.status.driver:Driver`;
    }
    private setUserPassenger(): void {
        this.role = TravelParticipantRole.PASSENGER;
        this.status = $localize`:@@travel-list-card.status.passenger:Passenger`;
    }
    private setUserApplicant(): void {
        this.role = TravelParticipantRole.APPLICANT;
        this.status = $localize`:@@travel-list-card.status.applicant:Awaiting acceptance`;
    }

    private setUserNone(): void {
        this.role = TravelParticipantRole.NONE;
        this.status = '';
    }
}

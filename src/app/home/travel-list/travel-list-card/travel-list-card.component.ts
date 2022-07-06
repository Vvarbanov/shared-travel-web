import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationHttpService } from 'src/app/core/services/http/notification-http.service';
import { Profile } from 'src/app/profile/models/profile.model';
import { DateService } from '../../../core/services/date/date.service';
import { TravelHttpService } from '../../../core/services/http/travel-http.service';
import { TravelDetailsDialogService } from '../../travel-details-dialog/services/travel-details-dialog.service';
import { Travel } from '../models/travel.model';
import { TravelParticipantRole } from './models/travel-participant-role.enum';

@Component({
    selector: 'app-travel-list-card',
    templateUrl: './travel-list-card.component.html',
    styleUrls: ['./travel-list-card.component.scss']
})
export class TravelListCardComponent implements OnInit {
    @Input() travel: Travel | undefined;
    @Input() profile: Profile | null | undefined;

    Role: typeof TravelParticipantRole = TravelParticipantRole;

    role: TravelParticipantRole = TravelParticipantRole.NONE;
    status: string = "";
    statusIcon: string = "";

    constructor(
        private travelHttpService: TravelHttpService,
        private notificationHttpService: NotificationHttpService,
        private travelDetailsDialogService: TravelDetailsDialogService,
        private dateService: DateService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.setCanJoin();
    }

    formatDate(date: Date): string | null {
        return this.dateService.formatDateLongPretty(date);
    }

    openTravelDetails(): void {
        this.travelDetailsDialogService.openTravelDetails(this.travel!);
    }

    requestJoinTravel(): void {
        if (this.travel!.passengers!.length >= this.travel!.vehicle!.seats) {
            return;
        }

        this.travelHttpService.requestJoinTravel(this.travel!.id).subscribe({
            next: () => {
                this.snackBar.open($localize`:@@travel-list-card.snackbar.successfull-application:Successful travel application!`, $localize`:@@snackbar.close:Close`, {
                    duration: 3000
                });

                this.setUserApplicant();
            }, error: e => console.error(e)
        });
    }

    cancelJoinRequest(): void {
        this.notificationHttpService.cancelJoinRequest(this.travel!.id).subscribe({
            next: () => {
                this.snackBar.open($localize`:@@travel-list-card.snackbar.successfull-cancel-application:Successfully canceled application!`, $localize`:@@snackbar.close:Close`, {
                    duration: 3000
                });

                this.setUserNone();
            }, error: e => console.error(e)
        });
    }

    leaveTravel(): void {
        this.travelHttpService.leaveTravel(this.travel!.id).subscribe({
            next: () => {
                this.snackBar.open($localize`:@@travel-list-card.snackbar.successfull-leave-travel:Successfully left the travel!`, $localize`:@@snackbar.close:Close`, {
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
            return;
        }

        if (this.travel!.passengers!.length >= this.travel!.vehicle!.seats) {
            this.setTravelFull();
            return;
        }

        this.setUserNone();
    }

    private setUserDriver(): void {
        this.role = TravelParticipantRole.DRIVER;
        this.status = $localize`:@@travel-list-card.status.driver:Driver`;
        this.statusIcon = 'directions_car';
    }
    private setUserPassenger(): void {
        this.role = TravelParticipantRole.PASSENGER;
        this.status = $localize`:@@travel-list-card.status.passenger:Passenger`;
        this.statusIcon = 'backpack';
    }
    private setUserApplicant(): void {
        this.role = TravelParticipantRole.APPLICANT;
        this.status = $localize`:@@travel-list-card.status.applicant:Pending`;
        this.statusIcon = 'hourglass_top';
    }

    private setTravelFull(): void {
        this.status = $localize`:@@travel-list-card.status.full:Full`;
        this.statusIcon = 'car_crash';
    }

    private setUserNone(): void {
        this.role = TravelParticipantRole.NONE;
        this.status = '';
        this.statusIcon = '';
    }
}

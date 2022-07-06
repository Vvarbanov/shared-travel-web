import { Travel } from "src/app/home/travel-list/models/travel.model";
import { JoinRequestNotification } from "./join-request-notification.model";

export interface TravelDetailsDialogData {
    notifications: Array<JoinRequestNotification>,
    travel: Travel,
    title: string,
}
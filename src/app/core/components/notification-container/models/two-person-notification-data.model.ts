import { SimpleTravelNotificationData } from "./simple-travel-notification-data.model";

export interface TwoPersonNotificationData extends SimpleTravelNotificationData {
    notifyingPerson: string;
}
import { Notification } from "./notification.model";
import { Travel } from '../../../../home/travel-list/models/travel.model';
import { Profile } from '../../../../profile/models/profile.model';
import { JoinRequestNotificationStatus } from "./join-request-notification-status.enum";

export interface JoinRequestNotification extends Notification {
    travel: Travel;
    passenger: Profile;
    status: JoinRequestNotificationStatus
}

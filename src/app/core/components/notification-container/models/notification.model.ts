import { NotificationTypeEnum } from './notification-type.enum';

export interface Notification {
    id: number;
    type: NotificationTypeEnum;
    messageData: string;
    createdDate: Date;
    read: boolean;
    processed: boolean;
}

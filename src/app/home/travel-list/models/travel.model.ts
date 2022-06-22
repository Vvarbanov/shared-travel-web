import { TravelStatusEnum } from './travel-status.enum';
import { Profile } from '../../../profile/models/profile.model';

export interface Travel {
    id: number;
    from: string;
    to: string;
    departureDate: Date;
    status: TravelStatusEnum;
    driver: Profile;
    passengers: Profile[];
    applied: boolean | undefined;
}

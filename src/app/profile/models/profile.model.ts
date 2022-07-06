import { ProfileSettings } from '../../settings/models/profile-settings.model';
export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileSettings: ProfileSettings;
}
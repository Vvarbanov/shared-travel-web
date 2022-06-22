import { ProfileSettings } from '../../settings/profile-settings/models/profile-settings.model';
export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileSettings: ProfileSettings;
}
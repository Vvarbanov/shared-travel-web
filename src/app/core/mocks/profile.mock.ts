import { Profile } from '../../profile/models/profile.model';

export const profileMock: Profile = {
    firstName: 'mock',
    lastName: 'mock',
    id: 2,
    email: 'mock@mock.com',
    phone: '886878665',
    profileSettings: {
        id: 2,
        emailVisible: false,
        phoneVisible: false,
        mailNotificationEnabled: false
    }
};


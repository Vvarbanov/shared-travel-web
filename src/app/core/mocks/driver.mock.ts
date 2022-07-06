import { Profile } from '../../profile/models/profile.model';

export const driverMock: Profile = {
    id: 1,
    email: 'driver@driver.com',
    firstName: 'driver',
    lastName: 'driver',
    phone: '886878665',
    profileSettings: {
        id: 1,
        emailVisible: true,
        phoneVisible: true,
        mailNotificationEnabled: true
    }
};
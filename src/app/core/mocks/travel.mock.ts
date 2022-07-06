import { Travel } from 'src/app/home/travel-list/models/travel.model';
import { TravelStatusEnum } from '../../home/travel-list/models/travel-status.enum';
import { driverMock } from './driver.mock';
import { vehicleMock } from './vehicle.mock';

export const travelMock: Travel = {
    id: 1,
    from: 'mock',
    to: 'mock',
    driver: driverMock,
    vehicle: vehicleMock,
    departureDate: new Date(),
    status: TravelStatusEnum.PENDING,
    passengers: [],
    applied: false
};;
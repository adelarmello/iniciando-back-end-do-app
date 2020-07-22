import FakeAppointmenstRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmenstRepository: FakeAppointmenstRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmenstRepository = new FakeAppointmenstRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmenstRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmenstRepository.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmenstRepository.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider01',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});

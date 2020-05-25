// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepoistory from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvalabilityService from './ListProviderDayAvalabilityService';

let fakeAppointmentsRepoistory: FakeAppointmentsRepoistory;
let listProviderDayAvailability: ListProviderDayAvalabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepoistory = new FakeAppointmentsRepoistory();
    listProviderDayAvailability = new ListProviderDayAvalabilityService(
      fakeAppointmentsRepoistory,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepoistory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepoistory.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
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

// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepoistory from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepoistory: FakeAppointmentsRepoistory;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepoistory = new FakeAppointmentsRepoistory();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepoistory,
    );
  });

  it('should be able to list the appointments on a specific day provider', async () => {
    const appointment1 = await fakeAppointmentsRepoistory.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepoistory.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});

import { injectable, inject } from 'tsyringe';

import IChacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmetsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private chacheProvider: IChacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.chacheProvider.recover('asd');

    console.log(cacheData);
    const appointments = await this.appointmentsRepository.findAllInDayProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    await this.chacheProvider.save('asd', 'asd');

    return appointments;
  }
}

export default ListProviderAppointmentsService;

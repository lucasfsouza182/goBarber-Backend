import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvalabilityService from '@modules/appointments/services/ListProviderDayAvalabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviders = container.resolve(ListProviderDayAvalabilityService);

    const availability = await listProviders.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}

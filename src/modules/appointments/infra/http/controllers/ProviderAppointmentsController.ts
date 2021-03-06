import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

// Listar os agendamentos de um prestador

export default class ProviderAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id; // Pega o  prestador logado
    const { day, month, year } = request.query; // Pega a data

    // Container.resolve vai carregar o service, vai ver no constructor se está
    // precisando de qualquer dependência
    const ListProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await ListProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}

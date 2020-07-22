import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
// isAfter verifica se um horário está depois do outro

import IAppointmentsRepository from '../repositories/IApointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number; // Qual hora
  available: boolean; // E se está disponível ou não
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now()); // Pega a data atual

    const availability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      ); // Ver se tem agendamento naquele horário

      const compareDate = new Date(year, month - 1, day, hour); // Dia , mês, ano e hora do agendamento: 2020-05-20 08:00:00

      return {
        hour,
        available: !hasAppointmentsInHour && isAfter(compareDate, currentDate),
        // Pra estar disponível: Não pode ter agendamento e a hora precisa ser depois da hora atual!
        // Pega a hora do agendamento e verifica se é depois da hora atual
      };
    });
    return availability;
  }
}

export default ListProviderDayAvailabilityService;

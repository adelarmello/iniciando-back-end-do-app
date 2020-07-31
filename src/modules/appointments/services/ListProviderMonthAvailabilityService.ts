import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IApointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    ); // Agendamentos de um mês específico

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59); // Guarda  o último horário do dia

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      }); // Retorna todo os agendamentos de um dia específico

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });
    // verificar quais horários estão disponíveis depois do horário de agora. O compareDate é a último horário do dia.
    // Agendamentos são um a cada hora,
    // começando das 8 até as 17, então são no total 10 agendamentos por dia.
    // se tem menos que 10 agendamentos significa que ainda tem horário disponível.

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;

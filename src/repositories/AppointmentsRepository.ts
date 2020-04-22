import { isEqual } from 'date-fns';
import Appoimtment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appoimtment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appoimtment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appoimtment | null {
    const findAppoitment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppoitment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appoimtment {
    const appointment = new Appoimtment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

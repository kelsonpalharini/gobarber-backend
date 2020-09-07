import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppErrors';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository = getCustomRepository(AppointmentsRepository);

  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

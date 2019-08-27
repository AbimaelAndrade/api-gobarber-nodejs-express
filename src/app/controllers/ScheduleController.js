import * as Yup from 'yup';
import { startOfHour, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import File from '../models/File';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;

    const checkUserProvider = await User.findOne({
      id: req.userId,
      provider: true,
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    /**
     * Get appointmets betwee
     * 2019-08-22 00:00:00
     * 2019-08-22 23:59:59
     */

    const parseDate = parseISO(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfHour(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        },
      ],
    });

    return res.json(appointment);
  }
}

export default new ScheduleController();

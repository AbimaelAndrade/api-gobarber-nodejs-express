import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    const date = format(
      parseISO(appointment.date),
      "dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${appointment.provider.name}<${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      text: `O agendamento do dia ${date} foi cancelado por ${appointment.user.name}.`,
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date,
      },
    });
  }
}
export default new CancellationMail();

import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async store(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          attributes: ['name', 'url', 'path'],
          as: 'avatar',
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();

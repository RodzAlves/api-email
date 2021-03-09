import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email } = request.body;

      const usersRepository = getRepository(User);

      const checkUserExists = await usersRepository.findOne({
        where: { email },
      });

      if (checkUserExists) {
        return response.status(400).json({
          error: 'Email address already used.',
        });
      }

      const user = usersRepository.create({
        name,
        email,
      });

      await usersRepository.save(user);

      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { UserController };

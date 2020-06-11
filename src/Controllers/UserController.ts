import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  public async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await getRepository(User).save(user);
    return res.json(user);
  }
}

export default new UserController();

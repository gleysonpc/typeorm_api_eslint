import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class AuthController {
  public async login(req: Request, res: Response) {
    //Login
    const { email, password } = req.body;
    const user = await getRepository(User).findOne({
      where: { email },
      select: ['name', 'email', 'password']
    });

    if (!user) return res.status(400).json({ message: 'User not found!' });
    const userPassword = user.validatePassword(password);
    if (!userPassword) res.status(400).json({ message: 'Incorrect Password!' });
    const token = user.generateAccessToken();
    const validatedUser = {
      name: user.name,
      email: user.email,
      token: token
    };
    return res.json(validatedUser);
  }

  public async register(req: Request, res: Response) {
    //Register
    const { name, email, password } = req.body;
    const emailInUse = await getRepository(User).findOne({ where: { email } });
    if (emailInUse)
      return res.status(400).json({ message: 'Email is already in use!' });
    const user = new User();
    user.name = name;
    user.email = email;
    const hashedPassword = user.hashPassword(password);
    user.password = hashedPassword;
    await getRepository(User).save(user);
    user.password = undefined;
    return res.status(201).json(user);
  }
}

export default new AuthController();

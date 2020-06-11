import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  public validatePassword(password: string) {
    const isValidPassword = bcrypt.compareSync(password, this.password);
    if (!isValidPassword) return false;
    return true;
  }

  public generateAccessToken() {
    const jwtData = {
      name: this.name,
      email: this.email
    };
    const token = jwt.sign(jwtData, process.env.TOKEN_SECRET);
    return `Bearer ${token}`;
  }
}

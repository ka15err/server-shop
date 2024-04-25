import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMassege: string }> {
    const user = new User();
    const existingByUserName = await this.findOne({
      where: { username: createUserDto.username },
    });
    const existingByUserEmail = await this.findOne({
      where: { email: createUserDto.email },
    });
    if (existingByUserName) {
      return { warningMassege: 'Имя занято' };
    }
    if (existingByUserEmail) {
      return { warningMassege: 'Email знаят' };
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    (user.username = createUserDto.username),
      (user.password = hashedPassword),
      (user.email = createUserDto.email);
    return user.save();
  }
}

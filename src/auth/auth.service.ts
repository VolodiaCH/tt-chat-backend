import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signUp(userData: { username: string; password: string }) {
    const existingUser = await this.userService.findByUsername(
      userData.username,
    );

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    try {
      const newUser = await this.userService.create(
        userData.username,
        hashedPassword,
      );
      return this.signIn(newUser);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already in use');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async signIn(user: any) {
    const payload = {
      sub: user._doc._id,
      username: user._doc.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}

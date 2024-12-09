import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/reloadProblems')
  async reloadProblems() {
    try {
      return await this.userService.reloadProblems();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository('UserEntity')
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async reloadProblems(): Promise<{ message: string; count: number }> {
    const count = await this.userRepository.count({
      where: { problems: true },
    });
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .where('problems = :problems', { problems: true })
      .set({ problems: false })
      .execute();
    return {
      message: 'problems reload to false, count user with problems=true:',
      count: count,
    };
  }
}

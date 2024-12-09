import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: false,
  })
  name: string;
  @Column({
    name: 'lastName',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: false,
  })
  lastName: string;
  @Column({ name: 'age', type: 'int', nullable: false })
  age: number;
  @Column({ name: 'gender', type: 'varchar', nullable: false })
  gender: Gender;
  @Column({ name: 'problems', type: 'boolean' })
  problems: boolean;
}
type Gender = 'male' | 'female';

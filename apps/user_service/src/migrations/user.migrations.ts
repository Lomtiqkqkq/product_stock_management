import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731870662218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(50) NOT NULL,
        problems BOOLEAN DEFAULT false
      );    
    `);
    for (let i = 0; i < 100; i++) {
      const hasProblems = Math.random() > 0.5;
      await queryRunner.query(`
        INSERT INTO users (firstName, lastName, age, gender, hasProblems)
        VALUES ('User${i}', 'LastName${i}', ${Math.floor(Math.random() * 60 + 18)}, 'male', ${hasProblems});
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}

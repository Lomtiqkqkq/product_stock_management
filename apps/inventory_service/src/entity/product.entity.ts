import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StockEntity } from './stock.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'plu', type: 'int' })
  plu: number;
  @Column({
    name: 'product_name',
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 255
  })
  product_name: string;
  @OneToMany(() => StockEntity, (stocks) => stocks.product)
  stocks: StockEntity[];
}

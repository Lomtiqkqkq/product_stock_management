import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'stock' })
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'product_id', type: 'int' })
  productId: number;
  @Column({ name: 'count_in_the_storage', type: 'int', default: 0 })
  count_in_the_storage: number;
  @Column({ name: 'count_in_order', type: 'int', default: 0 })
  count_in_order: number;
  @Column({ name: 'product_shop', type: 'int', nullable: false })
  shop_id: number;
  @ManyToOne(() => ProductEntity, (product) => product.stocks)
  product: ProductEntity;
}

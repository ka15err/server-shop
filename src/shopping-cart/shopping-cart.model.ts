import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column({ defaultValue: 0 })
  mebelId: number;

  @Column
  mebel_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  type: string;

  @Column
  name: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}

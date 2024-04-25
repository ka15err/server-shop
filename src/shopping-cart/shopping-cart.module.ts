import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';
import { UsersModule } from '../users/users.module';
import { MebelsModule } from '../mebels/mebels.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ShoppingCart]),
    UsersModule,
    MebelsModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}

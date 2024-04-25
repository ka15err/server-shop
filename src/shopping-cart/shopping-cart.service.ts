import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MebelsService } from 'src/mebels/mebels.service';
import { UsersService } from 'src/users/users.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCart } from './shopping-cart.model';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly mebelsService: MebelsService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const mebel = await this.mebelsService.findOne(addToCartDto.mebelId);

    cart.userId = user.id;
    cart.mebelId = mebel.id;
    cart.mebel_manufacturer = mebel.mebel_manufacturer;
    cart.type = mebel.type;
    cart.price = mebel.price;
    cart.in_stock = mebel.in_stock;
    cart.image = JSON.parse(mebel.images)[0];
    cart.name = mebel.name;
    cart.total_price = mebel.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    mebelId: number | string,
  ): Promise<{ count: number }> {
    await this.shoppingCartModel.update({ count }, { where: { mebelId } });

    const mebel = await this.shoppingCartModel.findOne({ where: { mebelId } });

    return { count: mebel.count };
  }

  async updateTotalPrice(
    total_price: number,
    mebelId: number | string,
  ): Promise<{ total_price: number }> {
    await this.shoppingCartModel.update(
      { total_price },
      { where: { mebelId } },
    );

    const mebel = await this.shoppingCartModel.findOne({
      where: { mebelId },
    });

    return { total_price: mebel.total_price };
  }

  async remove(mebelId: number | string): Promise<void> {
    const mebel = await this.shoppingCartModel.findOne({
      where: { mebelId },
    });

    await mebel.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}

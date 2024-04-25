import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.quard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';
import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
import {
  AddToCardResponse,
  GetAllResponse,
  TotalPriceRequest,
  TotalPriceResponse,
  UpdateCountRequest,
  UpdateCountResponse,
} from './types';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getAll(@Param('id') userId: string) {
    return this.shoppingCartService.findAll(userId);
  }

  @ApiOkResponse({ type: AddToCardResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  addToCar(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.add(addToCartDto);
  }

  @ApiOkResponse({ type: UpdateCountResponse })
  @ApiBody({ type: UpdateCountRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/count/:id')
  updateCount(
    @Body() { count }: { count: number },
    @Param('id') mebelId: string,
  ) {
    return this.shoppingCartService.updateCount(count, mebelId);
  }

  @ApiOkResponse({ type: TotalPriceResponse })
  @ApiBody({ type: TotalPriceRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/total-price/:id')
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('id') mebelId: string,
  ) {
    return this.shoppingCartService.updateTotalPrice(total_price, mebelId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') mebelId: string) {
    return this.shoppingCartService.remove(mebelId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:id')
  removeAll(@Param('id') userId: string) {
    return this.shoppingCartService.removeAll(userId);
  }
}

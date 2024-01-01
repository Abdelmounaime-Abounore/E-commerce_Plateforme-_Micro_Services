import { Controller, Post, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addProductToCart(@Body() cartDto: { productId: string }) {
    const cart = await this.cartService.addProductToCart(cartDto.productId);
    return { message: 'Product added to cart successfully', cart };
  }
}

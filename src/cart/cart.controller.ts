import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { ObjectId } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addProductToCart(@Body() cartDto: { cartId: string; productId: string }) {
    const cart = await this.cartService.addProductToCart(cartDto.cartId, cartDto.productId);
    return { message: 'Product added to cart successfully', cart };
  }

  @Delete()
  async deleteProductFromCart(@Body() cartDto: { cartId: string; productId: string }) {
    const cart = await this.cartService.deleteProductFromCart(cartDto.cartId, cartDto.productId);
    return { message: 'Product deleted from cart successfully', cart };
  }
}

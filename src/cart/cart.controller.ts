// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';
// import { Cart } from './entities/cart.entity';

// @Controller('api/carts')
// export class CartController {
//   constructor(private readonly cartService: CartService) {}

//   @Post(':cartId/products/:productId')
//   async addProductToCart(
//     @Param('cartId') cartId: string,
//     @Param('productId') productId: string,
//   ): Promise<Cart> {
//     return this.cartService.addProductToCart(cartId, productId);
//   }
// }

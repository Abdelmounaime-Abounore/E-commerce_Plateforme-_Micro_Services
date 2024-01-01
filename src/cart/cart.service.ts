// import { Injectable } from '@nestjs/common';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Cart, CartDocument } from './entities/cart.entity';
// import { Model } from 'mongoose';
// import { ProductService } from 'src/products/products.service';

// @Injectable()
// export class CartService {
//   constructor(
//     @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
//     private readonly productService: ProductService, // Product service injection
//   ) {}

//   async getCartById(cartId: string): Promise<Cart> {
//     return await this.cartModel.findById(cartId).exec();
//   }

//   async addProductToCart(cartId: string, productId: string): Promise<Cart> {
//     const cart = await this.cartModel.findById(cartId).exec();
//     const product = await this.productService.getProductById(productId);

//     if (cart && product) {
//       cart.products.push(product); // Add product to the cart's products array
//       await cart.save();
//     }

//     return cart;
//   }
// }

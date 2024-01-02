import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './entities/cart.entity';
import { Product, ProductDocument } from 'src/products/entities/product.entity';
import internal from 'stream';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async addProductToCart(cartId: string, productId: string): Promise<Cart> {
    try {
      const cart = await this.cartModel.findById(cartId);
      
  
      const product = await this.productModel.findById(productId);
      cart.products.push(productId);
      await cart.save();
  
      return cart.toJSON();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}

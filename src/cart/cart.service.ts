import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  async addProductToCart(productId: string): Promise<Cart> {
    const cart = new this.cartModel({
      product: productId,
      _id: new Types.ObjectId()
    })

    return (await cart.save()).toJSON();
  }
}

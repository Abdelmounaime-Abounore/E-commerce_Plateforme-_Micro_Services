import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem, CartItemDocument } from './entities/cart-item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CartItemsController } from './cart-items.controller';
import { Product, ProductDocument } from 'src/products/entities/product.entity';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from 'src/cart/entities/cart.entity';

@Injectable()
export class CartItemsService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(CartItem.name) private readonly cartItemModel: Model<CartItemDocument>,
  ) { }

  async addProductToCart(cartId: string, productId: string, quantity: number): Promise<CartItem> {
    try {
      const cart = await this.cartModel.findById(cartId);
      const product = await this.productModel.findById(productId);

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.quantity < quantity) {
        throw new BadRequestException('Invalid quantity');
      }

      // Assuming your CartItem model/entity has a method to create new instances
      const newCartItem = await this.cartItemModel.create({
        cartId: cart._id, // Assigning the cart's ID to the new cart item
        productId: product._id, // Assigning the product's ID to the new cart item
        quantity: quantity // Assigning the requested quantity
      });

      // Perform any other necessary operations here

      return newCartItem.toJSON();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateProductQuantity(cartId: string, productId: string, quantity: number): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemModel.findOne();
      console.log(cartItem)
      cartItem.quantity = quantity

      const updatedCartItem = await cartItem.save();

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }
      return updatedCartItem;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update product quantity in cart');
    }
  }

  async deleteProductFromCart(cartId: string, productId: string): Promise<CartItem> {
    console.log(cartId, productId)
    const cartItem = await this.cartItemModel.findOneAndDelete({
      cartId: new Types.ObjectId(cartId),
      productId: new Types.ObjectId(productId),
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    return cartItem;
  }

  // async deleteProductFromCart(cartId: string, productId: string): Promise<Cart> {
  //   try {
  //     const cart = await this.cartModel.findById(cartId);
  //     if (!cart) {
  //       throw new NotFoundException('Cart not found');
  //     }

  //     const product = await this.productModel.findById(productId);
  //     if (!product) {
  //       throw new NotFoundException('Product not found');
  //     }

  //     const productIndex = cart.products.findIndex(product => product._id.toString() === productId);
  //     if (productIndex === -1) {
  //       throw new NotFoundException('Product not found in the cart');
  //     }
  //     const productIds = cart.products.map(product => product._id.toString());
  //     console.log(productIds);


  //     const deletedProduct = cart.products.splice(productIndex, 1); // Remove the product from the array

  //     // Perform any other necessary logic, such as updating quantities or additional operations...

  //     await cart.save(); // Save the changes to the cart

  //     console.log(`Product with ID ${productId} deleted from cart with ID ${cartId}`);

  //     return cart.toJSON(); // Return the updated cart
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  // }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}

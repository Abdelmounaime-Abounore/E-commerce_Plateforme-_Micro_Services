import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
@Schema()
export class Cart {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: string[]; 
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose, { ObjectId, SchemaTypes, Types  } from 'mongoose';

@Schema()
export class Product {

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  // product: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

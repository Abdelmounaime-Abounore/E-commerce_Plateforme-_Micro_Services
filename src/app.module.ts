import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ProductController } from './products/products.controller';
import { ProductService } from './products/products.service';
// import { CartModule } from './cart/cart.module';
// import { CartController } from './cart/cart.controller';
// import { CartService } from './cart/cart.service';
// import { CartSchema } from './cart/entities/cart.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductsModule,
    // CartModule,
  ],
  // controllers: [CartController],
  // controllers: [ProductController],
  // providers: [CartService],
})
export class AppModule {}

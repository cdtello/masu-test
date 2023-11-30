import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}

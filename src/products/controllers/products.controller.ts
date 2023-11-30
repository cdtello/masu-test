import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
    @Query('filter') filter?: string,
    @Query('select') select?: string,
    ): Observable<Product[]> {
    return this.productService.getProducts(limit, skip, filter, select);
  }

  @Get(':id')
  getProductById(
    @Param('id') id: number
    ): Observable<Product> {
    return this.productService.getProductById(id);
  }
}
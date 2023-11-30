import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')

export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  /**
   * Handles HTTP GET requests to the base route /products.
   * Supports optional query parameters such as limit, skip, filter, and select.
   * @param limit - Optional parameter for limiting the number of results.
   * @param skip - Optional parameter for skipping a certain number of results.
   * @param filter - Optional parameter for filtering results based on a criteria.
   * @param select - Optional parameter for selecting specific fields in the results.
   * @returns Observable<Product[]> - An observable emitting an array of products.
   */
  @Get()
  @ApiQuery({ name: 'limit', required: false})
  @ApiQuery({name: 'skip', required: false})
  @ApiQuery({name: 'filter', required: false})
  @ApiQuery({name: 'select', required: false})
  getProducts(
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
    @Query('filter') filter?: string,
    @Query('select') select?: string,
    ): Observable<Product[]> {
    return this.productService.getProducts(limit, skip, filter, select);
  }

  /**
   * Handles HTTP GET requests to a specific route /products/:id.
   * @param id - The product ID obtained from the route parameter.
   * @returns Observable<Product> - An observable emitting a single product.
   */
  @Get(':id')
  getProductById(
    @Param('id') id: number
    ): Observable<Product> {
    return this.productService.getProductById(id);
  }
}
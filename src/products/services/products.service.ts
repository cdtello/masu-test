import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../entities/product.entity'; // Asegúrate de importar correctamente tu modelo de producto

@Injectable()
export class ProductsService {

  /**
   * Retrieves a list of products based on specified parameters.
   * @param limit - The maximum number of products to retrieve (default: 10).
   * @param skip - The number of products to skip (default: 0).
   * @param filter - Optional filter criteria for searching products.
   * @param select - Optional criteria for selecting specific fields in the results.
   * @returns Observable<Product[]> - An observable emitting an array of products.
   */
  getProducts(limit = 10, skip = 0, filter = null, select = null): Observable<Product[]> {
    const urlSelect = select === null 
      ? '' 
      : `&select=${select}`;
    const urlFilter = filter === null 
      ? '?' 
      : `/search?q=${filter}&`;
      
    const url = `https://dummyjson.com/products${urlFilter}limit=${limit}&skip=${skip}${urlSelect}`;
    return from(fetch(url)).pipe(
      switchMap(async (response) => {
        const data = await response.json();
        const {total, skip, limit, products} = data;
        return products.map((productData: any) => productData as Product);
      }),
    );
  }

  /**
   * Retrieves a single product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns Observable<Product> - An observable emitting a single product.
   */
  getProductById(id): Observable<Product> {
    const url = `https://dummyjson.com/products/${id}`;
    return from(fetch(url)).pipe(
      switchMap(async (response) => {
        const data = await response.json();
        return data as Product;
      }),
    );
  }
}
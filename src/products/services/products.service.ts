import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../entities/product.entity'; 
import axios, { AxiosResponse } from 'axios';

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
  getProducts(
    limit = 10,
    skip = 0,
    filter = null,
    select = null
  ): Observable<Product[]> {
    const urlSelect = select === null ? '' : `&select=${select}`;
    const urlFilter = filter === null ? '?' : `/search?q=${filter}&`;

    const url = `https://dummyjson.com/products${urlFilter}limit=${limit}&skip=${skip}${urlSelect}`;

    return from(
      axios.get<{ products: Product[] }>(url)
    ).pipe(
      switchMap((response: AxiosResponse<{ products: Product[] }>) => {
        const { products } = response.data;
        return from([products]); // Wrap the array in another array to match Observable<Product[]>
      })
    );
  }

  /**
   * Retrieves a single product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns Observable<Product> - An observable emitting a single product.
   */
  getProductById(id): Observable<Product> {
    const url = `https://dummyjson.com/products/${id}`;

    return from(
      axios.get<Product>(url)
    ).pipe(
      switchMap((response: AxiosResponse<Product>) => {
        return from([response.data]); // Wrap the data in an array to match Observable<Product> type
      })
    );
  }
}
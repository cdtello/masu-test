import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../entities/product.entity'; // Asegúrate de importar correctamente tu modelo de producto

@Injectable()
export class ProductsService {
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
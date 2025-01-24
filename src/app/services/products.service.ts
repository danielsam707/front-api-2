import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { Product, CreateProductDTO } from './../models/product.model';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
// young-sands-07814.herokuapp.com/api/products
  private apiUrl = 'https://api.escuelajs.co/api/v1/products'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, {params});
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict) {
          return throwError('Ups, algo esta fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.UnsupportedMediaType) {
          return throwError('NO estas permitido');
        }
        return throwError('Ups, algo salio mal');
      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    })
  }
  
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: any) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}

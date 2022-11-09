import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000/api/product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  get(page: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${page}`);
  }

  getFilters(filters: any): Observable<Product[]> {
    let params = {};
    params = filters;
    return this.api.get('product', new HttpParams({fromObject:params}));
  }

  getProductsSearch(search: string): Observable<any> {
    return this.http.get<Product>(baseUrl + 'list-search/' + search).pipe(
      map((data) => {
        //console.log(data);
        return data;
      })
    );
  } 

  favorite(slug: any): Observable<Product> {
    return this.api.post('product/' + slug + '/favorite');
  }

  unfavorite(slug: any): Observable<Product> {
    return this.api.delete('product/' + slug + '/favorite');
  }

  getfavorite(): Observable<Product> {
    return this.api.get('product/user/favorite');
  }
  // get(id: any): Observable<Product> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title: any): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${baseUrl}?title=${title}`);
  // }
}

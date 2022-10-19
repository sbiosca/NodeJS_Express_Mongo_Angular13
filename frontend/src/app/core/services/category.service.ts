import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
const baseUrl = 'http://localhost:3000/api/category/';

@Injectable ({
    providedIn: 'root',
})

export class CategoryService {
    
        constructor(private http: HttpClient) {
            this.getAll();
        }

        
        getAll(): Observable<Category[]> {
            //console.log(this.http.get<Category[]>(baseUrl))
            return this.http.get<Category[]>(baseUrl);
        }
        
        get(id: any): Observable<Category> {
            return this.http.get(`${baseUrl}/${id}`);
        }

        
}
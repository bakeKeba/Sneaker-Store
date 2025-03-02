import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${API_URL}/products`; // Uses dynamic API URL

  private http = inject(HttpClient); // Uses Angular's `inject` for better DI

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

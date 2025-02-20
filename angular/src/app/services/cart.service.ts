import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private apiUrl = 'http://localhost:3000/api/cart';

    constructor(private http: HttpClient) { }

    getCartItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addToCart(productId: number): Observable<any> {
        return this.http.post<any>(this.apiUrl, { productId });
    }

    removeFromCart(productId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${productId}`);
    }

    clearCart(): Observable<any> {
        return this.http.delete<any>(this.apiUrl);
    }
}

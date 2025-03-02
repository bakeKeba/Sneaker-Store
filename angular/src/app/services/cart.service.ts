import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private apiUrl = `${API_URL}/cart`; // Uses dynamic API URL

    private http = inject(HttpClient); // Uses Angular's `inject` for better DI

    getCartItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addToCart(shoe: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, shoe);
    }

    removeFromCart(shoeId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${shoeId}`);
    }

    updateCartItem(cartId: number, amount: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${cartId}`, { amount });
    }

    clearCart(): Observable<any> {
        return this.http.delete<any>(this.apiUrl);
    }
}

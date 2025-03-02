import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-cart-page',
    imports: [NgIf, HeaderComponent, NgFor],
    standalone: true,
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
    cart: any[] = [];
    subtotal: number = 0;
    shippingCost: number = 5;
    totalPrice: number = 0;

    constructor(private cartService: CartService,
        private router: Router,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.getCartItems();
    }

    getCartItems() {
        this.cartService.getCartItems().subscribe(items => {
            this.cart = items;
            this.calculateTotal();
        });
    }

    calculateTotal() {
        this.subtotal = this.cart.reduce((sum, item) => sum + (item.sale ? item.salePrice : item.price) * item.amount, 0);
        if (this.subtotal >= 100 || this.subtotal == 0) {
            this.shippingCost = 0;
        }
        else { this.shippingCost = 5; }
        this.totalPrice = parseFloat((this.subtotal + this.shippingCost).toFixed(2));
    }

    updateQuantity(item: any, event: any) {
        const newQuantity = parseInt(event.target.value, 10);
        this.cartService.updateCartItem(item.cartId, newQuantity).subscribe({
            next: (updatedCart) => {
                const index = this.cart.findIndex(cartItem => cartItem.cartId === item.cartId);
                if (index !== -1) {
                    this.cart[index].amount = newQuantity;
                    this.calculateTotal();
                }
            },
            error: (err) => {
                console.error('Error updating cart item:', err);
            }
        });
    }

    removeItem(shoe: any) {
        this.cartService.removeFromCart(shoe.cartId).subscribe({
            next: (updatedCart) => {
                this.cart = updatedCart;
                this.calculateTotal();
            },
            error: (err) => {
                console.error("Error removing item from cart:", err);
            }
        });
    }

    checkout() {
        this.snackBar.open('Service not available', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    clearCart() {
        this.cartService.clearCart().subscribe({
            next: (updatedCart) => {
                this.cart = [];
                this.calculateTotal();
            },
            error: (err) => {
                console.error("Error clearing cart:", err);
            }
        });
    }

    continueShopping() {
        this.router.navigate(['/']);
    }
}

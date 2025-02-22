import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';

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
    shippingCost: number = 5; // Example static shipping cost
    totalPrice: number = 0;

    constructor(private cartService: CartService) { }

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
        this.totalPrice = this.subtotal + this.shippingCost;
    }

    updateQuantity(item: any, event: any) {
        const newQuantity = parseInt(event.target.value, 10);
        const index = this.cart.findIndex(cartItem => cartItem.id === item.id && cartItem.size === item.size);
        if (index !== -1) {
            this.cart[index].amount = newQuantity;
            this.calculateTotal();
        }
    }

    removeItem(item: any) {
        this.cart = this.cart.filter(cartItem => !(cartItem.id === item.id && cartItem.size === item.size));
        this.calculateTotal();
    }

    clearCart() {
        this.cart = [];
        this.calculateTotal();
    }

    continueShopping() {
        window.history.back();
    }
}

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
    totalPrice: number = 0;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.getCartItems();
    }

    getCartItems(): void {
        this.cartService.getCartItems().subscribe(items => {
            this.cart = items;
            this.calculateTotalPrice();
        });
    }

    calculateTotalPrice(): void {
        this.totalPrice = this.cart.reduce((sum, item) => sum + (item.sale ? item.salePrice : item.price), 0);
    }
}

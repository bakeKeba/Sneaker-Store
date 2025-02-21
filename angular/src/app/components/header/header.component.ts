import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIf, NgClass],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    @Input() page: string = '';
    @Input() totalPrice: number = 0;
    cart: any[] = [];

    constructor(private location: Location,
        private router: Router,
        private cartService: CartService) {
    }

    ngOnInit(): void {
        this.getCartItems();
    }

    getCartItems() {
        this.cartService.getCartItems().subscribe(items => {
            this.cart = items;
        });
    }

    goBack(): void {
        this.location.back();
    }

    goToCart() {
        this.router.navigate([`/cart`]);
    }
}
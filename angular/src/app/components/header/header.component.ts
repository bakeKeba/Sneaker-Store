import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.service';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIf, NgClass],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    @Input() page: string = '';
    cart: any[] = [];

    constructor(private location: Location,
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
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import ActivatedRoute
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-selection-page',
    imports: [NgIf, HeaderComponent, NgFor],
    standalone: true,
    templateUrl: './selection-page.component.html',
    styleUrls: ['./selection-page.component.css']
})
export class SelectionPageComponent implements OnInit {
    shoe: any;
    sizes: number[] = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]; // Shoe sizes
    selectedSize: number | null = null;
    selectedImage: string = "";

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit() {
        const shoeId = this.activatedRoute.snapshot.paramMap.get('id');

        if (shoeId) {
            this.productService.getProductById(Number(shoeId)).subscribe((product) => {
                this.shoe = product;
                this.selectedImage = this.shoe.images[0];
            });
        } else {
            console.log('Product ID is missing');
        }
    }

    addToCart() {
        if (!this.selectedSize) return;

        const shoeWithSize = { ...this.shoe, size: this.selectedSize, amount: this.selectedSize };

        this.cartService.addToCart(shoeWithSize).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('Error adding to cart:', err);
            }
        });
    }

    changeImage(image: string) {
        this.selectedImage = image;
    }

    selectSize(size: number) {
        this.selectedSize = size;
    }
}

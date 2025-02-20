import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { ProductService } from '../../services/product.service';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-selection-page',
    imports: [NgIf, HeaderComponent],
    standalone: true,
    templateUrl: './selection-page.component.html',
    styleUrls: ['./selection-page.component.css']
})
export class SelectionPageComponent implements OnInit {
    shoe: any;

    constructor(
        private router: ActivatedRoute,
        private productService: ProductService
    ) { }

    ngOnInit() {
        const shoeId = this.router.snapshot.paramMap.get('id');

        if (shoeId) {
            this.productService.getProductById(Number(shoeId)).subscribe((product) => {
                this.shoe = product;
            });
        } else {
            console.log('Product ID is missing');
        }
    }
}

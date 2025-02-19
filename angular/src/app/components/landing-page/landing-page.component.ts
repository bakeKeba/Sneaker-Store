import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TableComponent } from '../table/table.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FilterComponent, TableComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response) {
          this.products = response;
          this.filteredProducts = response;
        } else {
          console.error("Invalid API response format:", response);
        }
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  onFilterChanged(filterData: { category: string, sortOption: string }) {
    if (filterData.category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.type === filterData.category);
    }

    // Sorting logic based on selected sort option
    if (filterData.sortOption) {
      this.filteredProducts = this.filteredProducts.sort((a, b) => {
        switch (filterData.sortOption) {
          case 'featured':
            return a.id - b.id;
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return (a.new === b.new) ? 0 : a.new ? -1 : 1;
          default:
            return 0;
        }
      });
    }
  }

}

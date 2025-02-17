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
  categories: string[] = ['All', 'Basketball', 'Boots', 'Football', 'Running'];
  selectedCategory: string = 'All';

  sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];
  selectedSortOption: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response.shoes && Array.isArray(response.shoes)) {
          this.products = response.shoes;
          //this.filteredProducts = response.shoes;
        } else {
          console.error("Invalid API response format:", response);
        }
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }


  selectCategory(category: string) {
    this.selectedCategory = category;
    // TODO: Filter products based on category
  }

  sortProducts() {
    // TODO: Implement sorting logic
    console.log('Sorting by:', this.selectedSortOption);
  }
}

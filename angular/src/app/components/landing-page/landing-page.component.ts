import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  categories: string[] = ['All', 'Basketball', 'Boots', 'Football', 'Running'];
  selectedCategory: string = 'All';

  sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];
  selectedSortOption: string = '';

  selectCategory(category: string) {
    this.selectedCategory = category;
    // TODO: Filter products based on category
  }

  sortProducts() {
    // TODO: Implement sorting logic
    console.log('Sorting by:', this.selectedSortOption);
  }
}

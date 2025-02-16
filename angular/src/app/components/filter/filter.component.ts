import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [NgFor, FormsModule],
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent {
    categories: string[] = ['All', 'Basketball', 'Boots', 'Football', 'Running'];
    selectedCategory: string = 'All';
    highlightWidth: number = 50;
    highlightLeft: number = 0;

    sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'newest', label: 'Newest First' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
    ];
    selectedSortOption: string = 'featured';

    selectCategory(category: string, index: number) {
        this.selectedCategory = category;
        // TODO: Filter products based on category   
        const spans = document.querySelectorAll('.filter-options span');
        if (spans.length > 0) {
            const selectedSpan = spans[index] as HTMLElement;
            this.highlightWidth = selectedSpan.offsetWidth;
            this.highlightLeft = selectedSpan.offsetLeft;
        }
    }

    sortProducts() {
        // TODO: Implement sorting logic
        console.log('Sorting by:', this.selectedSortOption);
    }
}

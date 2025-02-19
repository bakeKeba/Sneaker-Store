import { Component, EventEmitter, Output } from '@angular/core';
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

    @Output() filterChanged = new EventEmitter<any>();

    categories: string[] = ['All', 'Basketball', 'Boots', 'Lifestyle', 'Running'];
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

    onCategoryChange(category: string, index: number) {
        this.selectedCategory = category;
        const spans = document.querySelectorAll('.filter-options span');
        if (spans.length > 0) {
            const selectedSpan = spans[index] as HTMLElement;
            this.highlightWidth = selectedSpan.offsetWidth;
            this.highlightLeft = selectedSpan.offsetLeft;
        }
        this.emitFilterData();
    }

    onSortChange() {
        this.emitFilterData();
    }

    private emitFilterData() {
        this.filterChanged.emit({
            category: this.selectedCategory,
            sortOption: this.selectedSortOption
        });
    }
}

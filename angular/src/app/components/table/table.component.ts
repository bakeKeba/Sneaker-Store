import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-table',
    imports: [NgFor, FormsModule],
    standalone: true,
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {
    @Input() shoes: any[] = [];

    constructor(private router: Router) { }

    goToSelection(shoe: any) {
        this.router.navigate([`/selection/${shoe.id}`]);
    }
}

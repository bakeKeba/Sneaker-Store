import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'selection/:id', component: SelectionPageComponent },
];

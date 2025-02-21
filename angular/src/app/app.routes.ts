import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'selection/:id', component: SelectionPageComponent },
    { path: 'cart', component: CartPageComponent },

];

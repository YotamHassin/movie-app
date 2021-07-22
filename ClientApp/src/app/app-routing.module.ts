

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from './common/login.service';


/* 
const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  { path: 'product-details/:id', component: ProductDetails,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'specs', component: Specs }
    ]
  }
];
 */
import { MoviesComponent } from './movies/movies.component';

  // <a routerLink="/math">link to user component</a>
export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  
  { path: "login", component: LoginComponent },
  { path: "movies", component: MoviesComponent, canActivate: [LoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* Location Providers */
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';


export const LocationProviders = [
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

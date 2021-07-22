import { NgModule } from '@angular/core';

/*** imports */
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


// https://angular.io/guide/animations
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/*** providers */
import { LocationProviders } from './app-routing.module';
//import { ErrorProvider } from './app.error-handler';


/*** declarations */
// the bootstrap Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';


@NgModule({
  declarations: [    
    // app wrapper
    AppComponent, 
    LoginComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    // https://angular.io/guide/animations
    //BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    //StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [
    ...LocationProviders,
    //ErrorProvider    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

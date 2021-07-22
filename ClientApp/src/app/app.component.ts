
/* 
import { ApplicationRef, NgZone, ChangeDetectorRef } from '@angular/core';

// ApplicationRef.tick() - similar to Angular 1's $rootScope.$digest() -- i.e., check the full component tree
private tmp: ApplicationRef, 

// NgZone.run(callback) - similar to $rootScope.$apply(callback) -- i.e., evaluate the callback function inside the Angular 2 zone. I think, but I'm not sure, that this ends up checking the full component tree after executing the callback function.
private tmp: NgZone, 

// ChangeDetectorRef.detectChanges() - similar to $scope.$digest() -- i.e., check only this component and its children
private tmp: ChangeDetectorRef, 
*/


import { Component, OnInit } from '@angular/core';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { UserService } from './common/login.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //constructor() { }
  constructor(protected userService: UserService, public router: Router) {  }

  author: string = 'Yotam Hassin';
  title: string = 'My Movies';

  //ngOnInit() {}
  
  routes() {
		//return this.links;
		return routes
			.filter(r => r.path != '')
			.map(r => { return { title: r.path, fragment: r.path } });
	}

  
  public get user(): User {
    return this.userService.user;
  }

  public get hasUser(): boolean {
    return !!this.user;
  }

  public get userName(): string {
    return this.user.username;
  }
  
  logout(){
    delete this.userService.accessToken;
    delete this.userService.user;
    this.router.navigateByUrl('login');
    /* this.userService.logout().subscribe(() => {
      console.log('Logout AppComponent');

      //this.router.navigateByUrl('<pathDefinedInRouteConfig>');
      this.router.navigateByUrl('login');

    }); */

    
  }
  
  
}


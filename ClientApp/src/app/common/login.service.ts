

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { User, LoginData } from '../models/user';
import { MyHttpClient, OptionsType } from '../common/httpClient';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // UserService, http, signup, login
  // todo: cyclic dependency! UserService - MyHttpClient
  constructor(public http: MyHttpClient) { }

  baseUrl: string = 'http://localhost:3000/users';  // URL to web api
  getUrl(reletiveUrl: string): string {
    let url: string;
    if (this.baseUrl && this.baseUrl != '') {
      url = this.baseUrl + '/' + reletiveUrl;
    }
    else {
      url = reletiveUrl;
    }
    return url;
  }

  // let obj = {username: 'yotam', input_password: '123456', confirm_password: '123456'}
  // http.post('http://localhost:3000/users/login', obj, 'users/login', (res1) => {res = res1}).subscribe((res1)=>{res = res1});
  // let o = http.get('http://localhost:3000/protected', 'protec', {Headers: {Authorization: 'Bearer '+res.accessToken}})
  
  secureLocatins: string[] = ['movies'];
  accessToken: string = '';
  user: User;

  public get isLogin(): boolean {
    return this.accessToken && this.accessToken != '';
  }

  
  public isAccsepted(path: string) : boolean {
    return !this.secureLocatins.includes(path) || this.isLogin;
  }
  
  
  // signup, post, api
  // 
  signup(body: User): Observable<boolean> {
    let operation = 'signup';
    let url = this.getUrl(operation);

    return this.http.post<LoginData>(url, body, operation)
    .pipe(map((loginData: LoginData) => loginData.success));
  }

  login(body: User): Observable<User> {
    let operation = 'login';
    let url = this.getUrl(operation);
    console.log(operation, body);
    let observ = this.http.post<LoginData>(url, body, operation)
    observ.subscribe((loginData: LoginData) => {
      console.log('loginData', loginData);
      this.accessToken = loginData.accessToken;
      this.user = loginData.user;
    });

    return observ.pipe(map((loginData: LoginData) => loginData.user));
  }

  logout(): Observable<void> {
    let operation = 'logout';
    let url = this.getUrl(operation);
    console.log(operation);
    let observ = this.http.get<void>(url, operation)
    //observ.subscribe((loginData: {success: boolean}) => {
    observ.subscribe(() => {
      console.log('logout observ subscribe');
      delete this.accessToken;
      delete this.user;
    });

    return observ;
  }

  getAuthorizationOptions(): OptionsType {
    return { headers: { Authorization: 'Bearer ' + this.accessToken } };
  }


}


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  constructor(protected userService: UserService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log('LoginGuardService', {route, state});
    if (this.userService.isAccsepted(route.routeConfig.path)) {
      return of(true);
    }
    else {
      return of(false);
    }
    
    //return this.permissions.canActivate(this.currentUser, route.params.id);
  }
}

import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class authguardGuard {
  LoginInfo: any;
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    // Replace this logic with your authentication logic
    const isAuthenticated = true; // Example: assuming the user is authenticated

    // if (!isAuthenticated) {
    //   return of(this.router.createUrlTree(['/login']));

    // }

    if (state.url == '/login') {

      if (localStorage.getItem('user') != null) {
        this.router.navigate(['/']);
        return of(false);
      } else {
        return of(true);
      }

    }

    if (localStorage.getItem('user') != null) {

      this.LoginInfo = JSON.parse(localStorage.getItem('user') || '[]');
      if (route.data['roles'] && route.data['roles'].indexOf(this.LoginInfo.role) === -1) {

        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return of(false);
      }

      // authorised so return true
      return of(true);
    }
    this.router.navigate(['login']);
    return of(false);
  }
}



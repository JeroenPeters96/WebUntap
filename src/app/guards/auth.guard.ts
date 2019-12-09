import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (sessionStorage.getItem('login')) {
      console.log(sessionStorage.getItem('login'));
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }

    // console.log(sessionStorage.getItem('currentAccount'));
    // sessionStorage.setItem('currentAccount', null);
    // const accountJson = sessionStorage.getItem('currentAccount');
    // if (accountJson === null) {
    //   console.log('???')
    //   return true;
    // } else {
    //   this.router.navigate(['/auth']);
    //   return false;
    // }
}


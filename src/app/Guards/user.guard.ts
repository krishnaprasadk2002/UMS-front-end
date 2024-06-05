import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const localData = localStorage.getItem('token');
    const localUserData = localStorage.getItem('userdata')
    console.log(localData);
    
    if (localData && localUserData ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
  const localData = localStorage.getItem('admin_token')
 console.log(localData,"localdata");
 
  if(localData != null){
    return true
  }else{
    this.router.navigate(['/admin'])
    return false
  }
}
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = localStorage.getItem('admin_token');
    console.log(isAdmin,"isAdmin");
    
    if (isAdmin) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}

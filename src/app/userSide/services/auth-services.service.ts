import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private baseUrl = 'http://localhost:3000/user'
  currentUser: any;
  constructor(private http:HttpClient,private router:Router) { }

  login(usercredential:{email:string,password:string}){
    return this.http.post<{user: any, token:any}>(`${this.baseUrl}/login`,usercredential);
  }

  logOut(){
    this.http.post(`${this.baseUrl}/logout`,{}).subscribe(
      response => {
        console.log('Logged out successfully',response);
        localStorage.removeItem('token');
        localStorage.removeItem('userdata')
        this.router.navigate(['/login'])
      },
      error=>{
        console.error('loggedout Failed',error);
        
      }
    )
  }

  

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

}

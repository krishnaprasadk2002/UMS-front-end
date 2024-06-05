import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   private baseUrl = 'http://localhost:3000/admin'
  constructor(private http:HttpClient,private router:Router) { }

  login(usercredential:{email:string,password:string}){
    return this.http.post<{user: any, token:any}>(`${this.baseUrl}/adminlogin`,usercredential);
  }

  logout(){
    this.http.post<any>(`${this.baseUrl}/logout`,{}).subscribe(
      response => {
        console.log('Logged out successfully',response);
        localStorage.removeItem('admin_token')
        this.router.navigate(['/admin'])
      },
      error=>{
        console.error('loggedout Failed',error);
        
      }
    )
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

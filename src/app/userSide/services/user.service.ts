import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServicesService } from './auth-services.service';
import { userInfo } from '../../shared/store/login model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private authService: AuthServicesService) { }

  getUserDetails(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/me`, { headers });
  }

  updateUserDetails(data: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/data`, data, { headers });
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/upload`, formData, { headers });
  }

  setUsertoLocalstorage(response:any){
    localStorage.setItem('token', response.token)
    localStorage.setItem('userdata' , JSON.stringify(response.userData))
  }

getUserDataFromstorage(){

  let obj : userInfo={
    email: '',
    image: '',
    name: '',
    number: 0
  }



  if (typeof localStorage !== 'undefined' && localStorage.getItem('userdata')) {
    let jsonstring = localStorage.getItem('userdata') as string;
    obj = JSON.parse(jsonstring);
  }

  return obj;
  }
}
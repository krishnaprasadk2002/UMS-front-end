import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userInfo } from '../../shared/adminState/adminlogin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('admin_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  setUsertoLocalstorage(response: any) {
    localStorage.setItem('admin_token', response.token);
    localStorage.setItem('admindata', JSON.stringify(response.adminData));
  }

  getUserDataFromStorage(): userInfo {
    let obj: userInfo = {
      email: '',
      name: '',
      number: 0
    };

    if (typeof localStorage !== 'undefined' && localStorage.getItem('admindata')) {
      let jsonString = localStorage.getItem('admindata') as string;
      obj = JSON.parse(jsonString);
    }

    return obj;
  }

  fetchUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { headers: this.getAuthHeaders() });
  }

  deleteUser(userId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteuser/${userId}`, { headers: this.getAuthHeaders() });
  }

  searchUsers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/searchusers?query=${query}`, { headers: this.getAuthHeaders() });
  }
}

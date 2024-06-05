import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService){}
    adminLoginData = new FormGroup({

      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])

    })

    onSubmit(){
      if(this.adminLoginData.invalid){
        return
      }

      const adminData = {
        email:this.adminLoginData.value.email,
        password:this.adminLoginData.value.password
      }
     
      
      this.http.post<any>('http://localhost:3000/admin/adminlogin', adminData).subscribe({
        next: (response) => {
          this.toastr.success('Admin login successful!','succeess')
          console.log("Admin login successful:", response);
          localStorage.setItem('admin_token', response.token);
          this.router.navigate(['/dashboard'])

        },
        error: (error) => {
          this.toastr.error('Admin Login Failed','error')
          console.error('Login failed:', error);
        }
      });
      
    }

    get email(){
      return this.adminLoginData.get('email')
    }

    get password(){
      return this.adminLoginData.get('password')
    }

}

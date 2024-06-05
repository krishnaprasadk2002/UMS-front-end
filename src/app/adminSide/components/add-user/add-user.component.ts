import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService){}

  addUserData = new  FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  get name(){
    return this.addUserData.get('name')
  }

  get email(){
    return this.addUserData.get('email')
  }

  get number(){
    return this.addUserData.get('number')
  }

  get password(){
    return this.addUserData.get('password')
  }

  onAddUser(){
      
    const newUserData = {
      name:this.addUserData.value.name,
      email:this.addUserData.value.email,
      number:this.addUserData.value.number,
      password:this.addUserData.value.password
    }
    
    this.http.post<any>('http://localhost:3000/admin/addnewuser', newUserData)
      .subscribe({
        next: (response) => {
          console.log('User data added successfully', response);
          this.toastr.success('User added successfully!');
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.error('Add user failed', error);
          this.toastr.error('Failed to add user. Please try again.');
        }
      });
  }
}

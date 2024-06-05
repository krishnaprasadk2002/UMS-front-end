import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


function whiteSpace(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userRegisterData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  get email() {
    return this.userRegisterData.get('email');
  }

  get name() {
    return this.userRegisterData.get('name');
  }

  get number() {
    return this.userRegisterData.get('number');
  }

  get password() {
    return this.userRegisterData.get('password');
  }

  get confirmpassword() {
    return this.userRegisterData.get('confirmpassword');
  }

  onRegister() {
    if (this.userRegisterData.invalid) {
      return;
    }

    const userData = {
      name: this.userRegisterData.value.name,
      email: this.userRegisterData.value.email,
      number: this.userRegisterData.value.number,
      password: this.userRegisterData.value.password,
    };

    this.http.post<any>('http://localhost:3000/user/register', userData).subscribe({
      next: (response) => {
        console.log("Registration successful:", response);
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.toastr.error('Registration failed. Please try again.', 'Error');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-data',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css'
})
export class EditUserDataComponent implements OnInit {
  editForm!: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      data => {
        this.user = data;
        this.initializeForm();
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }

  initializeForm() {
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      number: [this.user.number, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.userService.updateUserDetails(this.editForm.value).subscribe(
        response => {
          console.log('User data updated successfully', response);
          this.toastr.success('user data uptadeted successfully!','success')
          this.router.navigate(['/profile']);
        },
        error => {
          this.toastr.error('user data updating failed','error')
          console.error('Error updating user details', error);
        }
      );
    }
  }

  get name() {
    return this.editForm.get('name');
  }

  get email() {
    return this.editForm.get('email');
  }

  get number() {
    return this.editForm.get('number');
  }
}
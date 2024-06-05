import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditAdminComponent implements OnInit {
  adminEditForm: FormGroup;
  userId!: string 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.adminEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this.loadUserData();
    });
  }

  loadUserData() {
    this.http.get<any>(`http://localhost:3000/admin/users/${this.userId}`).subscribe({
      next: (data) => {
        this.adminEditForm.patchValue(data);
      },
      error: (error) => {
        this.toastr.error('Failed to load user data', 'Error');
        console.error('Error loading user data:', error);
      }
    });
  }

  onSubmit() {
    if (this.adminEditForm.invalid) {
      return;
    }

    this.http.put(`http://localhost:3000/admin/users/${this.userId}`, this.adminEditForm.value).subscribe({
      next: () => {
        this.toastr.success('User data updated successfully!', 'Success');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.toastr.error('Failed to update user data', 'Error');
        console.error('Error updating user data:', error);
      }
    });
  }

  get name() {
    return this.adminEditForm.get('name');
  }

  get email() {
    return this.adminEditForm.get('email');
  }

  get number() {
    return this.adminEditForm.get('number');
  }
}

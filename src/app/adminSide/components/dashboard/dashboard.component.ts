import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/user-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  users: any[] = [];
  filteredUsers: any[] = [];

  constructor(
    private authService: AuthServiceService,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.fetchUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch user details', 'Error');
        console.error('Error fetching users:', error);
      }
    });
  }

  onEditUser(userId: any) {
    this.router.navigate(['/adminedit', userId]);
  }

  onDeleteUser(userId: any) {
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.toastr.success('User deleted successfully');
        this.fetchUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.toastr.error('Failed to delete user');
      }
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;

    if (searchTerm) {
      this.adminService.searchUsers(searchTerm).subscribe({
        next: (data) => {
          console.log('data', data);
          this.filteredUsers = data;
        },
        error: (error) => {
          console.error('Error searching users:', error);
          this.toastr.error('Failed to search users', 'Error');
        }
      });
    } else {
      this.filteredUsers = this.users;
    }
  }

}

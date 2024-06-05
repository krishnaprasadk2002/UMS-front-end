import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { AuthServicesService } from '../../services/auth-services.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent implements OnInit {
  user: any={};
  selectedFile: File | null = null;
  uploadedImage!: File;
  formData = new FormData();
  constructor(private userService: UserService,private authService:AuthServicesService,private http:HttpClient,private router:Router,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }


  onFileSelected(event:any) {
    this.uploadedImage = event.target.files[0];
  }

  uploadImage() {
    if (this.uploadedImage) {
      this.formData.append('image', this.uploadedImage, this.uploadedImage.name);
      this.formData.append('userId', this.user._id); 
      this.http.post('http://localhost:3000/user/uploadImage', this.formData).subscribe(
        (response: any) => {
          console.log(response);
          this.user.image = response.file.filename; 
          this.toastr.success("image uploded successfully",'success')
        },
        error => {
          console.error(error);
          
        }
      );
    }
  }

onEdit(){
  this.router.navigate(['/edit'],{state:{user:this.user}})
}
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { selectUser } from '../../../shared/store/login.selector';
import * as LoginAction from '../../../shared/store/login.actions'
import { userLogin } from '../../../shared/store/login model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  userLoginData!:FormGroup


   constructor(private http:HttpClient,private router:Router,private toastr:ToastrService,private store:Store){

    this.userLoginData = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
  
     })

   }

   get email(){
    return this.userLoginData.get('email')
   }

   get password(){
    return this.userLoginData.get('password')
   }

   user$ = this.store.select(selectUser)


   onLogin(){
    const userData:userLogin = this.userLoginData.value
    // console.log("userState",userData);
    
    this.store.dispatch(LoginAction.login({formData:userData}))


    this.user$.subscribe((user)=>{
      if(user){
        
        this.router.navigate(['/home'])
      }
    })



   }
}

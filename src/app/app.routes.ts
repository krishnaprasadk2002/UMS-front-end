import { Routes } from '@angular/router';
import { UserGuard } from './Guards/user.guard';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth-guard.guard';
import { AdminAuthGuard } from './Guards/admin-auth-guard.guard';

export const routes: Routes = [
    {
      path:'',
      redirectTo:'login',
      pathMatch:'full'
    },
    {
        path:'login',
        loadComponent:()=>import('./userSide/components/login/login.component').then(a => a.LoginComponent),
        canActivate: [AuthGuard]
    },
    {
        path:'register',
        loadComponent: ()=>import('./userSide/components/register/register.component').then(a => a.RegisterComponent),
      
    },
    {
        path:'home',
        loadComponent: ()=>import('./userSide/components/home/home.component').then(a=>a.HomeComponent),
        canActivate: [UserGuard]
    },
    {
        path:'profile',
        loadComponent: ()=> import('./userSide/components/profile/profile.component').then(a=>a.ProfileComponent),
        canActivate: [UserGuard]
    },
    {
       path:'edit',
       loadComponent: ()=>import('./userSide/components/edit-user-data/edit-user-data.component').then(a=>a.EditUserDataComponent),
       canActivate: [UserGuard]
    },


    //Admin side Routes 

    {
        path:'admin',
        loadComponent:()=>import('./adminSide/components/admin-login/admin-login.component').then(a => a.AdminLoginComponent),
        canActivate:[AdminAuthGuard]
    },
    {
        path:'dashboard',
        loadComponent: ()=>import('./adminSide/components/dashboard/dashboard.component').then(a => a.DashboardComponent),
        canActivate:[AdminGuard]
    },
    {
        path:'adduser',
        loadComponent: ()=>import('./adminSide/components/add-user/add-user.component').then(a=>a.AddUserComponent),
        canActivate:[AdminGuard]
    },
    {
        path:'adminedit/:id',
        loadComponent: ()=>import('./adminSide/components/edit-user/edit-user.component').then(a=>a.EditAdminComponent),
        canActivate:[AdminGuard]
    }
];

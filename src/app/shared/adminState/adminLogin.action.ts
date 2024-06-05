import { createAction, props } from '@ngrx/store';
import * as adminLogin from '../../shared/adminState/adminlogin.model';

export const adminlogin = createAction('[admin] Login', props<{ formData: adminLogin.adminAuth }>());
export const adminLoginSuccess = createAction('[Admin] Login Success', props<{ admin: adminLogin.userInfo }>());
export const adminLoginFailure = createAction('[Admin] Login Failure', props<{ error: any }>());

import { createAction, props } from "@ngrx/store";
import { userInfo, userLogin } from "./login model";

export const login = createAction('[Auth] Login',props<{formData:userLogin}>())
export const loginSuccess = createAction('[Auth] Login Success',props<{user : userInfo}>())
export const loginFailure = createAction('[Auth] Login Failed',props<{error:any}>())
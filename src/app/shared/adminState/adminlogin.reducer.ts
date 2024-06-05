import { createReducer, on } from '@ngrx/store';
import * as AdminLogin from '../../shared/adminState/adminLogin.action';

export interface AuthAdminState {
  user: any | null;
  token: string | null;
  error: any | null;
}

export const initialState: AuthAdminState = {
  user: null,
  token: null,
  error: null
};

export const adminAuthReducer = createReducer(
  initialState,
  on(AdminLogin.adminLoginSuccess, (state, { admin }) => ({
    ...state,
    user: admin,
    error: null
  })),
  on(AdminLogin.adminLoginFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

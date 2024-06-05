import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthAdminState } from '../adminState/adminlogin.reducer';

export const selectAdminState = createFeatureSelector<AuthAdminState>('admin');

export const selectUser = createSelector(
  selectAdminState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAdminState,
  (state) => state.token
);

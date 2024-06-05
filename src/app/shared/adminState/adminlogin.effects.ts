import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginAdminAction from '../../shared/adminState/adminLogin.action';
import { AuthServiceService } from '../../adminSide/services/auth-service.service';
import { AdminService } from '../../adminSide/services/user-service.service';

@Injectable()
export class AuthAdminEffects {
  constructor(
    private action$: Actions,
    private authServices: AuthServiceService,
    private adminService: AdminService
  ) {}

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoginAdminAction.adminlogin),
      switchMap((action) =>
        this.authServices.login(action.formData).pipe(
          map((response: any) => {
            console.log(response);
            this.adminService.setUsertoLocalstorage(response);
            return LoginAdminAction.adminLoginSuccess({ admin: response.userData });
          }),
          catchError((error) => of(LoginAdminAction.adminLoginFailure({ error })))
        )
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthServicesService } from '../../userSide/services/auth-services.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginAction from './login.actions';
import { UserService } from '../../userSide/services/user.service';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthServicesService, private userService:UserService) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginAction.login),
      switchMap((action) =>
        this.authService.login(action.formData).pipe(
          map((response: any) => {
            console.log(response);

            this.userService.setUsertoLocalstorage(response)

            return LoginAction.loginSuccess({ user: response.userData });
            
          }),
          catchError((error) => of(LoginAction.loginFailure({ error })))
        )
      )
    )
  );

}

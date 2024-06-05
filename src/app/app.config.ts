import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import {  provideToastr } from 'ngx-toastr';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './shared/store/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './shared/store/login.effects';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideStore({user:authReducer}),
     provideHttpClient(),
     provideToastr(),
     provideStoreDevtools(),
    provideState({name:'user',reducer:authReducer}),
    provideEffects(AuthEffects)]
};


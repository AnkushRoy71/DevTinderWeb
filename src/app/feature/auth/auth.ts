import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginRequestModel } from './models/login.model';
import { Observable } from 'rxjs';
import { UserModel } from '../../core/shared/models/user.model';

@Service()
export class Auth {
    http = inject(HttpClient);

    loginApi(loginCedentials: LoginRequestModel) : Observable<{data: UserModel, message: string}>{
        return this.http.post<{ data: UserModel; message: string }>(
          'http://localhost:3000/login',
          loginCedentials,
        );
    }
}

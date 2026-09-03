import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginRequestModel } from './models/login.model';
import { Observable } from 'rxjs';
import { UserModel } from '../../core/shared/models/user.model';
import { environment } from '../../../environments/environment.development';

@Service()
export class Auth {
    http = inject(HttpClient);

    loginApi(loginCedentials: LoginRequestModel) : Observable<{data: UserModel, message: string}>{
        return this.http.post<{ data: UserModel; message: string }>(
          `${environment.API_URL}/login`,
          loginCedentials,
          { withCredentials: true },
        );
    }

    logOutApi() : Observable<{message: string}> {
        return this.http.get<{ message: string }>(
          `${environment.API_URL}/logout`, { withCredentials: true }
        );
    }
}

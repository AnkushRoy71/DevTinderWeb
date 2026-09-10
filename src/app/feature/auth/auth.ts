import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginRequestModel, RegisterRequestModel } from './models/auth.model';
import { Observable } from 'rxjs';
import { UserModel } from '../../core/shared/models/user.model';
import { environment } from '../../../environments/environment.development';
import { ApiResponseModel } from '../../core/shared/models/apiReponse.model';

@Service()
export class Auth {
  http = inject(HttpClient);

  loginApi(loginCedentials: LoginRequestModel): Observable<{ data: UserModel; message: string }> {
    return this.http.post<{ data: UserModel; message: string }>(
      `${environment.API_URL}/login`,
      loginCedentials,
      { withCredentials: true },
    );
  }

  registerUser(user: RegisterRequestModel) {
    return this.http.post<ApiResponseModel<UserModel>>(`${environment.API_URL}/signup`, user,{
      withCredentials: true,
    });
  }

  logOutApi(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${environment.API_URL}/logout`, {
      withCredentials: true,
    });
  }
}

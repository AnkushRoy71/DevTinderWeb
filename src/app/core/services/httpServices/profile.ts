import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import {  ApiResponseModel } from '../../shared/models/apiReponse.model';
import { ProfileFormModel } from '../../../feature/profile/profile';

@Service()
export class ProfileService {
  http = inject(HttpClient);

  getUserDetails(): Observable<ApiResponseModel<UserModel>> {
    return this.http.get<ApiResponseModel<UserModel>>(`${environment.API_URL}/user`, {
      withCredentials: true,
    });
  }

  updateUserDetails(user: ProfileFormModel): Observable<ApiResponseModel<UserModel>> {
    return this.http.patch<ApiResponseModel<UserModel>>(`${environment.API_URL}/user`,user, {
      withCredentials: true,
    });
  }
}

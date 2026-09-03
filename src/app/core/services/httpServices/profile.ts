import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { ApiSuccessResponseModel } from '../../shared/models/apiReponse.model';

@Service()
export class Profile {
    http = inject(HttpClient);

    getUserDetails() : Observable<ApiSuccessResponseModel<UserModel>> {
        return this.http.get<ApiSuccessResponseModel<UserModel>>(`${environment.API_URL}/user`, {withCredentials: true});
    }
}

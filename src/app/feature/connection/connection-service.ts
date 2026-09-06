import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ConnectionModel } from '../../core/shared/models/connection.model';
import { ApiResponseModel } from '../../core/shared/models/apiReponse.model';

@Service()
export class ConnectionService {
    http = inject(HttpClient);

    getConnections() : Observable<ApiResponseModel<ConnectionModel[]>> {
        return this.http.get<ApiResponseModel<ConnectionModel[]>>(`${environment.API_URL}/users/connections`, {withCredentials: true});
    }
}

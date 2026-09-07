import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponseModel } from '../../core/shared/models/apiReponse.model';
import { RequestModel } from '../../core/shared/models/request.model';
import { RequestStatus } from '../../core/shared/types/request-status';

@Service()
export class RequestService {
  http = inject(HttpClient);

  getRequests(): Observable<ApiResponseModel<RequestModel[]>> {
    return this.http.get<ApiResponseModel<RequestModel[]>>(`${environment.API_URL}/users/request`, {
      withCredentials: true,
    });
  }

  handleRequest(status: RequestStatus, requestId: string): Observable<ApiResponseModel<null>> {
    return this.http.post<ApiResponseModel<null>>(
      `${environment.API_URL}/review/request/${status}/${requestId}`, {},
      {
        withCredentials: true,
      },
    );
  }
}

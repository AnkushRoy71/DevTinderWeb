import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FeedModel } from '../../core/shared/models/feed.model';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../core/shared/models/apiReponse.model';
import { ConnectionStatus } from '../../core/shared/types/request-status';

@Service()
export class FeedService {
  http = inject(HttpClient);

  getFeed(): Observable<ApiResponseModel<FeedModel[]>> {
    return this.http.get<ApiResponseModel<FeedModel[]>>(`${environment.API_URL}/users/feed`, {
      withCredentials: true,
    });
  }

  handleConnection(status: ConnectionStatus, receiverId: string): Observable<ApiResponseModel<null>> {
    return this.http.post<ApiResponseModel<null>>(
      `${environment.API_URL}/request/${status}/${receiverId}`,
      {},
      {
        withCredentials: true,
      },
    );
  }
}

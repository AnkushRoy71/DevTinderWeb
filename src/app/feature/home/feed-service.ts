import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FeedModel } from '../../core/shared/models/feed.model';
import { Observable } from 'rxjs';
import {  ApiResponseModel } from '../../core/shared/models/apiReponse.model';

@Service()
export class FeedService {
  http = inject(HttpClient);

  getFeed(): Observable<ApiResponseModel<FeedModel[]>> {
    return this.http.get<ApiResponseModel<FeedModel[]>>(
      `${environment.API_URL}/users/feed`,
      { withCredentials: true },
    );
  }
}

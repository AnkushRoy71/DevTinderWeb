import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginRequestModel } from './models/login.model';
import { Observable } from 'rxjs';

@Service()
export class Auth {
    http = inject(HttpClient);

    loginApi(loginCedentials: LoginRequestModel) : Observable<string>{
        return this.http.post<string>('http://localhost:3000/login', loginCedentials);
    }
}

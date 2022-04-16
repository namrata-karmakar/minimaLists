import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    login(userCredentials: LoginDto): Promise<UserDataDto> {
        return this.http
            .post<UserDataDto>(`${environment.USER}/login`, userCredentials)
            .toPromise();
    }
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface UserDataDto {
    token: string;
    userID: string;
}

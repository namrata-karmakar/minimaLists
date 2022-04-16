import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    constructor(private http: HttpClient) {}

    signup(signupData: SignupDto): Promise<string> {
        return this.http
            .post<string>(`${environment.USER}/signup`, signupData)
            .toPromise();
    }
}

export interface SignupDto {
    username: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    termsAndConditions: boolean;
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TOASTIE_MESSAGES } from 'src/environments/toastie-messages';
import { CustomSnackbarService } from '../services/custom-snackbar.service';
import { LoginDto, LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private customSnackbarService: CustomSnackbarService
    ) {}

    loginFormGroup = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                )
            ]
        ]
    });

    ngOnInit(): void {}

    async onSubmit() {
        try {
            const response = await this.loginService.login(
                this.loginFormGroup.value as LoginDto
            );
            const { token, userID } = response;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userID', userID);
            if (token) {
                sessionStorage.setItem('isLoggedIn', 'true');
                this.navigateToViewTodosPage();
                this.customSnackbarService.openSuccessSnackbar(`${TOASTIE_MESSAGES.loginSuccess}`);
            }
        } catch (e) {
            console.error(e);
            this.customSnackbarService.openErrorSnackbar(e.error);
        }
    }

    navigateToViewTodosPage() {
        this.router.navigate(['/todos']);
    }
}

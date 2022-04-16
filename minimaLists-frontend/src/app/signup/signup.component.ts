import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar/';
import { SignupDto } from './signup.service';
import { dateOfBirthValidator } from '../validations/dateOfBirthValidator';
import { passwordsMatchValidator } from '../validations/passwordsMatchValidator';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { CustomSnackbarService } from '../services/custom-snackbar.service';
import { TOASTIE_MESSAGES } from '../../environments/toastie-messages'
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [SignupService]
})
export class SignupComponent implements OnInit {
    hidePassword = true;
    hideConfirmPassword = true;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(
        private formBuilder: FormBuilder,
        private signupService: SignupService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private customSnackbarService: CustomSnackbarService
    ) {}

    signupFormGroup = this.formBuilder.group(
        {
            username: ['', [Validators.email, Validators.required]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                    )
                ]
            ],
            confirmPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                    )
                ]
            ],
            dob: ['', [Validators.required, dateOfBirthValidator()]],
            tnc: ['', Validators.requiredTrue]
        },
        {
            validators: passwordsMatchValidator
        }
    );

    get username(): FormControl {
        return this.signupFormGroup.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.signupFormGroup.get('password') as FormControl;
    }

    get confirmPassword(): FormControl {
        return this.signupFormGroup.get('confirmPassword') as FormControl;
    }

    get dob(): FormControl {
        return this.signupFormGroup.get('dob') as FormControl;
    }

    get tnc(): FormControl {
        return this.signupFormGroup.get('tnc') as FormControl;
    }

    ngOnInit(): void {}

    async onSubmit() {
        try {
            await this.signupService.signup(this.signupFormGroup.value as SignupDto);
            this.navigateToLoginPage();
            this.customSnackbarService.openSuccessSnackbar(`${TOASTIE_MESSAGES.signUpSuccess}`);
        } catch (e) {
            console.error(e);
        }
    }

    navigateToLoginPage() {
        this.router.navigate(['/page/login']);
    }

    openSnackBar() {
        this._snackBar.open('Cannonball!!', 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
        });
    }
}

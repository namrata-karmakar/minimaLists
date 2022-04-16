import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class CustomSnackbarService {
    duration = 3000;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snackBar: MatSnackBar) {}

    openSuccessSnackbar(message: string) {
        this.snackBar.open(`${message}`, 'Close', {
            panelClass: 'my-custom-success-snackbar',
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
        });
    }

    openErrorSnackbar(message: string) {
        this.snackBar.open(`${message} `, 'Close', {
            panelClass: 'my-custom-error-snackbar',
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
        });
    }

    openWarningSnackbar(message: string) {
        this.snackBar.open(`${message}`, 'Close', {
            panelClass: 'my-custom-warning-snackbar',
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
        });
    }

    openInfoSnackbar(message: string) {
        this.snackBar.open(`${message}`, 'Close', {
            panelClass: 'my-custom-info-snackbar',
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
        });
    }
}

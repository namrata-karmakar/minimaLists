import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOASTIE_MESSAGES } from 'src/environments/toastie-messages';
import { CustomSnackbarService } from '../services/custom-snackbar.service';

@Component({
    selector: 'app-logout-dialog',
    templateUrl: './logout-dialog.component.html',
    styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {
    constructor(private router: Router, private customSnackbar: CustomSnackbarService) {}

    ngOnInit(): void {}

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/page/login']);
        this.customSnackbar.openSuccessSnackbar(`${TOASTIE_MESSAGES.logoutSuccess}`);
    }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
            top: '0'
        };
        this.dialog.open(LogoutDialogComponent, dialogConfig);
    }
}

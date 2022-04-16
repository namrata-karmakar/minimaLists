import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
    selector: 'app-add-todo-button',
    templateUrl: './add-todo-button.component.html',
    styleUrls: ['./add-todo-button.component.css']
})
export class AddTodoButtonComponent implements OnInit {
    @Output() addTodoDialogCloseEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dialog: MatDialog) {}

    openAddTodoDialog(): void {
        const dialogRef = this.dialog.open(AddTodoDialogComponent, {
            height: '50vh',
            width: '30vw'
        });
        dialogRef.afterClosed().subscribe(() => this.addTodoDialogCloseEvent.emit());
    }

    ngOnInit(): void {}
}

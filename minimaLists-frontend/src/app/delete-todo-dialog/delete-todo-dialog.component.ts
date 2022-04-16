import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TOASTIE_MESSAGES } from 'src/environments/toastie-messages';
import { CustomSnackbarService } from '../services/custom-snackbar.service';
import { TodosService, TodosDataDto } from '../services/todos.service';

@Component({
    selector: 'app-delete-todo-dialog',
    templateUrl: './delete-todo-dialog.component.html',
    styleUrls: ['./delete-todo-dialog.component.css']
})
export class DeleteTodoDialogComponent implements OnInit {
    constructor(
        private todosService: TodosService,
        private dialogRef: MatDialogRef<DeleteTodoDialogComponent>,
        private customSnackbarService: CustomSnackbarService,
        @Inject(MAT_DIALOG_DATA) public data: TodosDataDto
    ) {}

    ngOnInit(): void {}

    onCancel() {
        this.dialogRef.close();
    }

    async deleteTodo(data: TodosDataDto): Promise<void> {
        try {
            const { _id } = data;
            const res = await this.todosService.deleteTodoById(_id);
            this.dialogRef.close();
            this.customSnackbarService.openSuccessSnackbar(`${TOASTIE_MESSAGES.deleteTodoSuccess}`);
        } catch (e) {
            console.error(e);
            this.customSnackbarService.openErrorSnackbar(e.message);
        }
    }
}

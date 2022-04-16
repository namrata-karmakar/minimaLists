import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TOASTIE_MESSAGES } from 'src/environments/toastie-messages';
import { Status } from '../add-todo-dialog/add-todo-dialog.component';
import { CustomSnackbarService } from '../services/custom-snackbar.service';
import { TodosDataDto, TodosService } from '../services/todos.service';

@Component({
    selector: 'app-edit-todo-dialog',
    templateUrl: './edit-todo-dialog.component.html',
    styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {
    statusOptions: Status[] = [
        { value: 'Not Started', viewValue: 'Not Started' },
        { value: 'In Progress', viewValue: 'In Progress' },
        { value: 'Done', viewValue: 'Done' }
    ];
    constructor(
        private formBuilder: FormBuilder,
        private todosService: TodosService,
        private dialogRef: MatDialogRef<EditTodoDialogComponent>,
        private customSnackbarService: CustomSnackbarService,
        @Inject(MAT_DIALOG_DATA) public data: TodosDataDto
    ) { }

    editTodoFormGroup = this.formBuilder.group({
        todo: ['', [Validators.required]],
        status: [this.statusOptions[3], Validators.required],
        userID: sessionStorage.getItem('userID'),
        updatedOn: new Date()
    })

    ngOnInit(): void {
        this.patchEditTodoDialog(this.data);
    }

    patchEditTodoDialog(data: TodosDataDto) {
        this.editTodoFormGroup.patchValue({
            todo: data.todo,
            status: data.status
        });
    }

    onCancel() {
        this.dialogRef.close();
    }

    async editTodo(data: TodosDataDto): Promise<void> {
        try {
            const { _id } = data;
            await this.todosService.editTodoById(_id, this.editTodoFormGroup.value as TodosDataDto);
            this.dialogRef.close();
            this.customSnackbarService.openSuccessSnackbar(`${TOASTIE_MESSAGES.updateTodoSuccess}`);
        } catch (e) {
            console.error(e);
            this.customSnackbarService.openErrorSnackbar(e);
        }
    }
}
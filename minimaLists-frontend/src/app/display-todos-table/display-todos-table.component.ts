import { Component, Input, OnChanges } from '@angular/core';
import { TodosDataDto, TodosService } from '../services/todos.service';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
    selector: 'app-display-todos-table',
    templateUrl: './display-todos-table.component.html',
    styleUrls: ['./display-todos-table.component.css']
})
export class DisplayTodosTableComponent implements OnChanges {
    columnsToDisplay: string[] = ['todos', 'status', 'editButton', 'deleteButton'];
    @Input() randomNumber = 0;
    dataSource: TodosDataDto[] = [];

    constructor(private todosService: TodosService, private dialog: MatDialog) { }

    ngOnChanges(): void {
        this.getTodos();
    }

    addTodoDialogCloseEventHandler() {
        this.getTodos();
    }

    async getTodos() {
        try {
            const userID: string | null = sessionStorage.getItem('userID');
            this.dataSource = await this.todosService.getTodosByUserId(userID);
            this.dataSource = this.dataSource.reverse();
        } catch (e) {
            console.error(e);
        }
    }

    openEditTodoDialog(todo: TodosDataDto) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            _id: todo._id,
            todo: todo.todo,
            status: todo.status
        };
        dialogConfig.width = '30%';
        const dialogRef = this.dialog.open(EditTodoDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(async () => {
            try {
                await this.getTodos();
            } catch (e) {
                console.error(e);
            }
        });
    }

    openDeleteTodoDialog(todo: TodosDataDto) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
            top: '0'
        };
        dialogConfig.data = {
            _id: todo._id,
            todo: todo.todo
        };
        dialogConfig.width = '30%';
        const dialogRef = this.dialog.open(DeleteTodoDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(async () => {
            try {
                await this.getTodos();
            } catch (e) {
                console.error(e);
            }
        });
    }
}

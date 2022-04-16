import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-view-todos-page',
    templateUrl: './view-todos-page.component.html',
    styleUrls: ['./view-todos-page.component.css']
})
export class ViewTodosPageComponent implements OnInit {
    randomNumber = 0;
    constructor() {}

    ngOnInit(): void {}
}

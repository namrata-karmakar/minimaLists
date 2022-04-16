import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-logged-in-navbar',
    templateUrl: './logged-in-navbar.component.html',
    styleUrls: ['./logged-in-navbar.component.css']
})
export class LoggedInNavbarComponent implements OnInit {
    randomNumber = 0;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {}

    addTodoDialogCloseEventHandler() {
        this.randomNumber = Math.random();
    }
}

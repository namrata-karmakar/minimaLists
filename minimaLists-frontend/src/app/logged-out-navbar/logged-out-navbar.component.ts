import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-logged-out-navbar',
    templateUrl: './logged-out-navbar.component.html',
    styleUrls: ['./logged-out-navbar.component.css']
})
export class LoggedOutNavbarComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) {}
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn: string | null = 'false';
    constructor() {}

    ngOnInit(): void {
        this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    }
}

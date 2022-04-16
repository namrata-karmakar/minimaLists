import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-interstitial-page',
    templateUrl: './interstitial-page.component.html',
    styleUrls: ['./interstitial-page.component.css']
})
export class InterstitialPageComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        console.log('sLoggedIn', isLoggedIn);
        if (isLoggedIn === 'true') {
            this.router.navigate(['/todos']);
        } else {
            this.router.navigate(['/page/home']);
        }
    }
}

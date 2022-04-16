import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstitialPageComponent } from './interstitial-page.component';

describe('InterstitialPageComponent', () => {
    let component: InterstitialPageComponent;
    let fixture: ComponentFixture<InterstitialPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InterstitialPageComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InterstitialPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

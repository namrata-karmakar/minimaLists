import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodosPageComponent } from './view-todos-page.component';

describe('ViewTodosPageComponent', () => {
    let component: ViewTodosPageComponent;
    let fixture: ComponentFixture<ViewTodosPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewTodosPageComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewTodosPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

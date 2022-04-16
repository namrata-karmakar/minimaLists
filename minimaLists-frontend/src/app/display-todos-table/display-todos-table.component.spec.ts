import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTodosTableComponent } from './display-todos-table.component';

describe('DisplayTodosTableComponent', () => {
    let component: DisplayTodosTableComponent;
    let fixture: ComponentFixture<DisplayTodosTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayTodosTableComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayTodosTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoButtonComponent } from './add-todo-button.component';

describe('AddTodoButtonComponent', () => {
    let component: AddTodoButtonComponent;
    let fixture: ComponentFixture<AddTodoButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddTodoButtonComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTodoButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

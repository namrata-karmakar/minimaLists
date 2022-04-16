import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AddTodoButtonComponent } from './add-todo-button/add-todo-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTodoDialogComponent } from './add-todo-dialog/add-todo-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { TodosService } from './services/todos.service';
import { DisplayTodosTableComponent } from './display-todos-table/display-todos-table.component';
import { ViewTodosPageComponent } from './view-todos-page/view-todos-page.component';
import { LoggedOutNavbarComponent } from './logged-out-navbar/logged-out-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PageComponent } from './page/page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoggedInNavbarComponent } from './logged-in-navbar/logged-in-navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { DeleteTodoDialogComponent } from './delete-todo-dialog/delete-todo-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InterstitialPageComponent } from './interstitial-page/interstitial-page.component';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        AddTodoButtonComponent,
        AddTodoDialogComponent,
        DisplayTodosTableComponent,
        ViewTodosPageComponent,
        LoggedOutNavbarComponent,
        PageComponent,
        FooterComponent,
        HomeComponent,
        LoggedInNavbarComponent,
        LogoutComponent,
        LogoutDialogComponent,
        DeleteTodoDialogComponent,
        NavbarComponent,
        InterstitialPageComponent,
        EditTodoDialogComponent
    ],
    entryComponents: [AddTodoDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatDividerModule,
        LayoutModule,
        MatSidenavModule,
        MatListModule,
        MatSnackBarModule
    ],
    providers: [TodosService],
    bootstrap: [AppComponent]
})
export class AppModule {}

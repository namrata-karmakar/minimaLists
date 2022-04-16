import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InterstitialPageComponent } from './interstitial-page/interstitial-page.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { SignupComponent } from './signup/signup.component';
import { ViewTodosPageComponent } from './view-todos-page/view-todos-page.component';

const routes: Routes = [
    {
        path: '',
        component: InterstitialPageComponent
    },
    {
        path: 'page',
        component: PageComponent,
        children: [
            {
                path: '',
                component: InterstitialPageComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    },
    {
        path: 'todos',
        component: ViewTodosPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

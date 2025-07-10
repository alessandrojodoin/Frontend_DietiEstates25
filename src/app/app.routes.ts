import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { SignupClienteComponent } from './signupCliente/signupCliente.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: "signup-cliente",
        title: "Sign Up",
        component: SignupClienteComponent
    },
    {
        path: '',
        title: "DietiEstates",
        component: HomeComponent
    },
        {
        path: "login",
        title: "Login",
        component: LoginComponent
    },

    
    
    
    ];




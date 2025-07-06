import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { SignupClienteComponent } from './signupCliente/signupCliente.component';

export const routes: Routes = [{
        path: "signup-cliente",
        title: "Sign Up",
        component: SignupClienteComponent
    },
    {path: '', component: HomeComponent},];




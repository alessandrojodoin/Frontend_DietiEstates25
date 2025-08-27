import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { SignupClienteComponent } from './signupCliente/signupCliente.component';
import { LoginComponent } from './login/login.component';
import { CreaImmobileComponent } from './crea-immobile/crea-immobile.component';
import { CreaImmobilePage1Component } from './crea-immobile-page1/crea-immobile-page1.component';
import { CreaImmobilePage3Component } from './crea-immobile-page3/crea-immobile-page3.component';
import { RiepilogoAttivitaComponent } from './riepilogo-attivita/riepilogo-attivita.component';

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
    {
        path: "create-immobile",
        title: "Carica Immobile",
        component: CreaImmobilePage3Component
    },
    {
        path: "riepilogo-attivita",
        title: "Riepilogo Attività",
        component: RiepilogoAttivitaComponent
    },

    
    
    
    ];




import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { SignupClienteComponent } from './signupCliente/signupCliente.component';
import { LoginComponent } from './login/login.component';
import { CreaImmobileComponent } from './create-immobile/crea-immobile/crea-immobile.component';
import { CreaImmobilePage1Component } from './create-immobile/crea-immobile-page1/crea-immobile-page1.component';
import { CreaImmobilePage2Component } from './create-immobile/crea-immobile-page2/crea-immobile-page2.component';
import { CreaImmobilePage3Component } from './create-immobile/crea-immobile-page3/crea-immobile-page3.component';
import { CreaImmobilePage4Component } from './create-immobile/crea-immobile-page4/crea-immobile-page4.component';
import { SearchResultMapComponent } from './search-result-map/search-result-map.component'; 
import { DettagliImmobileComponent } from './dettagli-immobile/dettagli-immobile.component';

import { RiepilogoAttivitaComponent } from './registro-attivita/riepilogo-attivita/riepilogo-attivita.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard-agente/dashboard/dashboard.component';
import { ImmobiliListUtenteComponent } from './registro-attivita/immobili-list-utente/immobili-list-utente.component';
import { SummaryComponent } from './create-immobile/summary/summary.component';
import { SearchResultImmobiliComponent } from './search-result-immobili/search-result-immobili.component';
import { SearchResultComponent } from './search-result/search-result.component';

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
        component: CreaImmobileComponent
    },
    
    {
        path: 'summary',
        title: 'Riepilogo Immobile',
        component: SummaryComponent
    },
    {
        path: "riepilogo-attivita",
        title: "Riepilogo Attività",
        component: RiepilogoAttivitaComponent
    },
    {
        path: "logout",
        title: "Logout",
        component: LogoutComponent
    },
    {
        path: "dashboard",
        title: "Dashboard",
        component: DashboardComponent
    },
    {
        path: "search-result",
        title: "Risultati Ricerca",
        component: SearchResultComponent
    },
    {
        path: "dettagli-immobile",
        title: "Dettagli Immobile",
        component: DettagliImmobileComponent
    },

    
    
    
    ];




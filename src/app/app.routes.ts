import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { SignupClienteComponent } from './signupCliente/signupCliente.component';
import { LoginComponent } from './login/login.component';
import { CreaImmobileComponent } from './create-immobile/crea-immobile/crea-immobile.component';
import { DettagliImmobileComponent } from './dettagli-immobile/dettagli-immobile.component';
import { RiepilogoAttivitaComponent } from './registro-attivita/riepilogo-attivita/riepilogo-attivita.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard-agente/dashboard/dashboard.component';
import { SummaryComponent } from './create-immobile/summary/summary.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AmministratoreSupportoComponent } from './utenza-amministrazione/gestore/amministratore-supporto.component';
import { CreaAgenteComponent } from './utenza-amministrazione/amministratore/crea-agente/crea-agente.component';
import { AdminUpdateCredentialsComponent } from './utenza-amministrazione/admin-update-credentials/admin-update-credentials.component';


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
        path: "dettagli-immobile/:id",
        title: "Dettagli Immobile",
        component: DettagliImmobileComponent
    },
    {
        path: "crea-amministratore",
        title: "Amministratore di supporto",
        component: AmministratoreSupportoComponent
    },
    {
        path: "crea-agente",
        title: "Nuovo Agente Immobiliare",
        component: CreaAgenteComponent
    },
    {
        path: "adminUpdateCredentials",
        title: "Aggiorna Credenziali",
        component: AdminUpdateCredentialsComponent
    },

    
    
    
    ];




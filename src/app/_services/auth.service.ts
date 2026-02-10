import { inject, Injectable, Injector } from '@angular/core';
import { AuthRestService } from './auth-backend.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, EMPTY, lastValueFrom, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserType } from '../../types';


type AuthState = {
  nome: string | null,
  cognome: string | null,
  email: string | null,
  numeroTelefonico: string | null,
  user: string | null,
  userType: UserType | null
  agenziaImmobiliare: string | null,
  token: string | null,
  googleLinked: boolean,
  readonly isTokenValid: boolean
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private injector = inject(Injector);

  authState: AuthState = {
    nome: null,
    cognome: null,
    email: null,
    numeroTelefonico: null,
    user: null,
    userType: null,
    agenziaImmobiliare: null,
    token: null,
    googleLinked: false,
    get isTokenValid(){
      try{
        if(this.token === null){
          return false;
        }
        else{
          const expiration = jwtDecode(this.token).exp;
          if(expiration === undefined || Date.now() >= expiration * 1000){
            return false;
          }
        }
        return true;
      }
      catch(error: any){
        return false;
      }
    } 
  }

  public getAuthHeaders() {
      const token = this.getToken();
      if (token) {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }),
          responseType: 'json' as const,
        }
      } else {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': ``
          }),
          responseType: 'json' as const,
        }
      }
    }

public getAuthHeadersTextResponse() {
      const token = this.getToken();
      if (token) {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }),
          responseType: 'text' as const,
        }
      } else {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': ``
          }),
          responseType: 'text' as const,
        }
      }
    }

  constructor() {
  console.log("AuthService constructor called");
  this.authState.token = this.getToken();

  
  if (this.authState.token !== null) {
    console.log("Token found in localStorage:", this.authState.token);
    const decodedToken: any = jwtDecode(this.authState.token);
    this.authState.user = decodedToken.username as string;
    this.authState.userType = decodedToken.userType as UserType;

    console.log("Decoded token:", decodedToken);

    const rest = this.injector.get(AuthRestService);
    rest.getUserData(this.getUsername()).subscribe({
      next: (userData: any) => {
          console.log('User data retrieved:', userData);
          this.authState.user = userData.username;
          this.authState.nome = userData.nome;
          this.authState.cognome = userData.cognome;
          this.authState.email = userData.email;
          this.authState.numeroTelefonico = userData.numeroTelefonico;
          this.authState.agenziaImmobiliare = userData.agenziaImmobiliare;
      },
      error: (error: any) => {
        console.error('Error retrieving user data:', error);
      }
    });
    
  }
}



  private setToken(token: string){
    localStorage.setItem("token", token);

    this.authState.token = token;
    const decodedToken: any = jwtDecode(token);
    this.authState.user = decodedToken.username as string;
    this.authState.userType = decodedToken.userType as UserType;
    this.authState.googleLinked = decodedToken.googleLinked ?? false;

  }

  public updateTokenAfterGoogleLogin(newJwt: string) {
    this.setToken(newJwt);
  }


  getToken(): string | null{
    return localStorage.getItem("token");
  }

  login(loginCredentials: {username: string, password: string}){

    return new Promise((resolve) => {
      const rest = this.injector.get(AuthRestService);
      const request = rest.login(loginCredentials);


      request.subscribe({
        next: (token: any) => {
          this.setToken(token);

          rest.getUserData(loginCredentials.username).subscribe({
            next: (userData: any) => {
              console.log('User data retrieved:', userData);
              this.authState.user = userData.username;
              this.authState.nome = userData.nome;
              this.authState.cognome = userData.cognome;
              this.authState.email = userData.email;
              this.authState.numeroTelefonico = userData.numeroTelefonico;
              this.authState.agenziaImmobiliare = userData.agenziaImmobiliare;
            },
            error: (error: any) => {
              console.error('Error retrieving user data:', error);
            }
          });

          
          resolve(null);
        },
        error: (error: any) => {
        },
        complete: () => {}

      })
    })  

  }

  isUserAuthenticated(): boolean {
    return this.authState.isTokenValid
  }

  getUsername(): string {
    if(this.authState.user){
      return this.authState.user;
    }
    else return "";
   
  }

  getUserType(): string {
    if(this.authState.userType){
      return this.authState.userType;
    }
    else return "";
   
  }

  logout(){
    this.authState.user = null;
    this.authState.token = null;
    localStorage.removeItem("token");
  }


}

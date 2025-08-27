import { Component, inject, Injector } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRestService } from '../_services/auth-backend.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  loginForm = new FormGroup({
    username: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    ),
    password: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    ),
  })

  onSubmit(){
    if(this.loginForm.invalid){
      this.toastr.error("Please make sure you have filled all of the fields", "Error");
    }
     else{

      this.authService.login({
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      })
      .then( () =>{
        this.toastr.success("Logged in succesfully!", "Success");
         this.router.navigate(["/"]);
      })
      .catch((error) => {
        if(error instanceof HttpErrorResponse){
            this.toastr.error(error.error.message);
        }
      })
    }
  }


    /* else{

      this.authService.login({
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      })
      .then( () =>{
        this.toastr.success("Logged in succesfully!", "Success");
         this.router.navigate(["/"]);
      })
      .catch((error) => {
        if(error instanceof HttpErrorResponse){
            this.toastr.error(error.error.message);
        }
      })
    }*/



  
}


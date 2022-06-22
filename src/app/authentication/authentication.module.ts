import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { MaterialModule } from '../core/material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordChangeDialogComponent } from './components/password-change-dialog/password-change-dialog.component';

@NgModule({
    declarations: [
        AuthenticationComponent,
        LoginComponent,
        RegisterComponent,
        PasswordChangeDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule
    ]
})
export class AuthenticationModule { }

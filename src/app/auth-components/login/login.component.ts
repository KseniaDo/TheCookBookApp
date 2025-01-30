import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { environment } from 'src/environments/environment.development';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ]
})
export class LoginComponent implements OnInit {
    authService = inject(AuthService);
    errorMessage: string | null = null;
    hide = true;
    http = inject(HttpClient);
    loginForm!: FormGroup;
    router = inject(Router);
    
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.fb.nonNullable.group({
            inputEmail: ['', Validators.required],
            inputPassword: ['', Validators.required],
        })
    }

    onSubmit() {
        const rawForm = this.loginForm.getRawValue();
        this.authService
            .login(rawForm.inputEmail, rawForm.inputPassword)
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/');
                },
                error: (err) => {
                    this.errorMessage = err.code;
                }
        })
    }
}
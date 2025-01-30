import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { environment } from 'src/environments/environment.development';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-registration',
    standalone: true,
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ]
})
export class RegistrationComponent implements OnInit {
    authService = inject(AuthService);
    errorMessage: string | null = null;
    hide = true;
    http = inject(HttpClient);
    registrationForm!: FormGroup;
    router = inject(Router);

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.registrationForm = this.fb.nonNullable.group({
            inputLogin: ['', Validators.required],
            inputEmail: ['', Validators.required],
            inputPassword: ['', Validators.required],
        })
    }

    onSubmit() {
        var rawForm = this.registrationForm.getRawValue();
        this.authService
            .register(rawForm.inputEmail, rawForm.inputLogin, rawForm.inputPassword)
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/');
                },
                error: (err) => {
                    this.errorMessage = err.message;
                }
            })
    }
}
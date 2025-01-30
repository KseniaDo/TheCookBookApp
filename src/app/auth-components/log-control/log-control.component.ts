import { Component, EventEmitter, inject, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/auth.service';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

import { UserInterface } from 'src/app/user.interface';
import { AuthStates } from './auth-states';

@Component({
    selector: 'app-log-control',
    standalone: true,
    templateUrl: './log-control.component.html',
    styleUrls: ['./log-control.component.css'],
    imports: [
        AppRoutingModule,
        MatButtonModule,
        CommonModule,
        LoginComponent,
        RegistrationComponent,
    ]
})
export class LogControlComponent {
    authService = inject(AuthService);
    @Input() authServiceSignal: any;
    authState: AuthStates = AuthStates.LOGIN;
    data = {};
    @Output() onLogout: EventEmitter<any> = new EventEmitter();
    title = 'cookbookapp';

    changeState(state: string) {
        switch (state) {
            case 'login':
                this.authState = AuthStates.LOGIN;
                break;
            case 'register':
                this.authState = AuthStates.REGISTER;
                break;
        }
    }

    logout() {
        this.onLogout.emit('true');
    }
}
import { Component, EventEmitter, inject, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/auth.service';
import {MatButtonModule} from '@angular/material/button';

import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

import { UserInterface } from 'src/app/user.interface';

const enum AuthStates {
    LOGIN,
    REGISTER,
}

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
export class LogControlComponent implements OnInit {
  constructor() { }
  @Input() authServiceSignal: any;
  @Output() onLogout: EventEmitter<any> = new EventEmitter();
  authService = inject(AuthService);
  title = 'cookbookapp';
  authState: AuthStates = AuthStates.LOGIN;
  data = {};
  ngOnInit(): void {
      
  }

  changeState(state: string) {
    switch(state) {
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
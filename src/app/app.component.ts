import { Component, inject, Input, OnInit } from '@angular/core';
import { CardInformation } from './recipe-card/cardinformation';
import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import * as process from 'process'
import { AuthService } from './auth.service';
window['process'] = process;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)
  data = {};
  @Input() menu_items = [
    {
      route: '/main-page',
      title: 'Все рецепты'
    },
    {
      route: '/recipe-page-create-update',
      title: 'Создать рецепт'
    },
  ]

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.userSignal.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.userSignal.set(null);
      }
    });
  }

  logout(data: any) {
    if (data == 'true') {
      this.authService.logout();
    }
  }
}

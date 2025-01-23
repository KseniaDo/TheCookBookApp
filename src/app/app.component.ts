import { Component, Input } from '@angular/core';
import { CardInformation } from './recipe-card/cardinformation';
import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import * as process from 'process'
window['process'] = process;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() { }
  title = 'cookbookapp';
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
  
}

import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    NgFor,
  ]
})
export class MenuComponent {
    // menu_items = [
    //     'Все рецепты',
    //     'Создать рецепт'
    // ];
    @Input() menu_items = [
        {
            route: '/main-page',
            title: 'Все рецепты'
        },
        {
            route: '/recipe-page',
            title: 'Создать рецепт'
        },
    ]
}
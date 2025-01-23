import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import { HeaderComponent } from '../common/header/header.component';
import { MenuComponent } from '../common/menu/menu.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    MenuComponent,
    MatGridListModule,
    RecipeCardComponent,
  ]
})
export class MainPageComponent implements OnInit {
    recipesList?: any[];

    ngOnInit(): void {
        var resultGet = this.GET();
        resultGet.then(data => {
          this.recipesList = JSON.parse(JSON.stringify(data));
          console.log(this.recipesList);
        })
    }
    
    async GET() {
        var client = await createClient(environment.EDGE_CONFIG, {
          cache: 'force-cache',
        }).get("recipes");    
        return client;
    }
}
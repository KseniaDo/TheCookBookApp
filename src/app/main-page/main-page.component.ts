import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import { HeaderComponent } from '../common/header/header.component';

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
        MatGridListModule,
        RecipeCardComponent,
    ]
})
export class MainPageComponent implements OnInit {
    recipesList?: any[];
    private recipeToDeleteIndex: any;

    async deleteRecipe(data: any) {
        this.recipeToDeleteIndex = this.recipesList?.findIndex(x => x.id == data);
        if (this.recipeToDeleteIndex > -1) {
            this.recipesList?.splice(this.recipeToDeleteIndex, 1);
        }
        try {
            const updateEdgeConfig = await fetch(
                `https://api.vercel.com/v1/edge-config/${environment.EDGE_CONFIG_ID}/items`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${environment.USER_TOKEN_AUTH}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: [
                            {
                                operation: 'update',
                                key: environment.KEY_RECIPE_ELEMENT,
                                value: this.recipesList
                            }
                        ]
                    }),
                },
            );
            const result = await updateEdgeConfig.json();
        } catch (error) {
        }
    }

    async GET() {
        var client = await createClient(environment.EDGE_CONFIG, {
            cache: 'no-store',
        }).get(environment.KEY_RECIPE_ELEMENT);
        return client;
    }

    ngOnInit(): void {
        var resultGet = this.GET();
        resultGet.then(data => {
            this.recipesList = JSON.parse(JSON.stringify(data));
        })
    }
}
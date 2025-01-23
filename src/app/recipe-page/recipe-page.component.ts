import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';
import { MenuComponent } from '../common/menu/menu.component';

import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import { MatCardModule } from '@angular/material/card';

import { ActivatedRoute, Params } from '@angular/router';

import { CardInformation } from '../recipe-card/cardinformation';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-recipe-page',
    standalone: true,
    templateUrl: './recipe-page.component.html',
    styleUrls: ['./recipe-page.component.css'],
    imports: [
        CommonModule,
        HeaderComponent,
        MenuComponent,
        MatCardModule,
    ]
})
export class RecipePageComponent implements OnInit {
    displayedColumns: string[] = ['Ингредиент', 'Количество', 'Единица измерения'];
    private linkEditDataId: string = "";
    private recipeToShow!: any;
    private recipeToShowIndex!: any;
    recipesList?: any[];
    cardData!: CardInformation;

    async GET() {
        var client = await createClient(process.env.EDGE_CONFIG === undefined ? process.env.EDGE_CONFIG : environment.EDGE_CONFIG, {
            cache: 'force-cache',
        }).get("recipes");
        return client;
    }

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        var resultGet = this.GET();
        resultGet.then(data => {
            this.recipesList = JSON.parse(JSON.stringify(data));
            this.linkEditDataId = this.activatedRoute.snapshot.params["id"];
            this.recipeToShowIndex = this.recipesList?.findIndex(x => x.id == this.linkEditDataId);
            this.recipeToShow = this.recipesList![this.recipeToShowIndex!];

            this.cardData = {
                id: this.recipeToShow.id,
                name: this.recipeToShow.name,
                date: this.recipeToShow.date,
                recipeimg: this.recipeToShow.recipeimg,
                ingredients: this.recipeToShow.ingredients,
                stages: this.recipeToShow.stages,
            }
        })
    }
}
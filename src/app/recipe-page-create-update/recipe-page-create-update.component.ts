import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import { HeaderComponent } from '../common/header/header.component';
import { MenuComponent } from '../common/menu/menu.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

const enum States {
    UNKNOWN,
    CREATE,
    EDIT,
}

@Component({
    selector: 'app-recipe-page-create-update',
    standalone: true,
    templateUrl: './recipe-page-create-update.component.html',
    styleUrls: ['./recipe-page-create-update.component.css'],
    imports: [
        FormsModule,
        CommonModule,
        HeaderComponent,
        MenuComponent,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    providers: [DatePipe]
})
export class RecipePageCreateUpdateComponent implements OnInit {
    private state: States = States.UNKNOWN;
    private linkEditDataId: string = "";
    private recipeToEdit!: any;
    private recipeToEditIndex!: any;
    recipesList?: any[];

    async GET() {
        var client = await createClient(process.env.EDGE_CONFIG, {
            cache: 'force-cache',
        }).get("recipes");
        return client;
    }

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

    // @Input() measurements?: any[];
    measurements = [
        "ст.л.",
        "ч.л.",
        "л.",
        "шт.",
    ]
    recipeForm!: FormGroup;

    ngOnInit(): void {
        var resultGet = this.GET();
        resultGet.then(data => {
            this.recipesList = JSON.parse(JSON.stringify(data));
            console.log(this.recipesList);
            this.linkEditDataId = this.activatedRoute.snapshot.params["id"];
            this.state = this.linkEditDataId ? States.EDIT : States.CREATE;
            if (this.state == States.EDIT) {
                this.recipeToEditIndex = this.recipesList?.findIndex(x => x.id == this.linkEditDataId);
                this.recipeToEdit = this.recipesList![this.recipeToEditIndex!];
                console.log(this.recipeToEdit);
                this.recipeForm = this.fb.group({
                    inputName: this.recipeToEdit.name,
                    inputIngredients: this.recipeToEdit.ingredients ? this.fb.array(this.recipeToEdit.ingredients.map((x: any) => this.getIngredientValuesFromGroup(x))) : [],
                    inputStages: this.recipeToEdit.stages ? this.fb.array(this.recipeToEdit.stages.map((x: any) => this.getStagesFromGroup(x))) : [],
                })
            } else {
                this.recipeForm = this.fb.group({
                    inputName: '',
                    inputIngredients: this.fb.array([]),
                    inputStages: this.fb.array([]),
                })

                const fa = (this.recipeForm.get('inputStages') as FormArray);
                const fIngr = (this.recipeForm.get('inputIngredients') as FormArray);
                this.addNewStage();
                this.addNewIngredient();
            }
        })
    }

    get inputStages(): FormArray {
        return this.recipeForm.get('inputStages') as FormArray;
    }
    get inputIngredients(): FormArray {
        return this.recipeForm.get('inputIngredients') as FormArray;
    }

    getIngredientValuesFromGroup(data: any) {
        return this.fb.group({
            item: [data.item],
            amount: [data.amount],
            measure: [data.measure]
        })
    }

    getStagesFromGroup(data: any) {
        return this.fb.group({
            text: [data.text]
        })
    }

    addNewStage(inputText: string = '') {
        const fa = (this.recipeForm.get('inputStages') as FormArray);
        fa.push(this.fb.group({
            text: inputText,
        }));
    }
    addNewIngredient(inputItem: string = '', inputAmount: string = '', inputMeasure: string = '') {
        const fIngr = (this.recipeForm.get('inputIngredients') as FormArray);
        fIngr.push(this.fb.group({
            item: inputItem,
            amount: inputAmount,
            measure: inputMeasure,
        }));
    }

    async showData() {
        this.recipeForm.get('inputStages') as FormArray;
        this.recipeForm.get('inputIngredients') as FormArray;
        var resultObject = this.recipeForm.value;
        var newRecipe
        console.log(resultObject);
        if (this.state == States.EDIT) {
            newRecipe = {
                id: this.recipeToEdit.id,
                name: resultObject.inputName,
                date: this.recipeToEdit.date,
                recipeimg: 'It will be a img of recipe',
                ingredients: resultObject.inputIngredients,
                stages: resultObject.inputStages,
            }
            this.recipesList![this.recipeToEditIndex] = newRecipe;
        } else {
            newRecipe = {
                id: uuidv4(),
                name: resultObject.inputName,
                date: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
                recipeimg: 'It will be a img of recipe',
                ingredients: resultObject.inputIngredients,
                stages: resultObject.inputStages,
            }
            this.recipesList?.unshift(newRecipe);
        }
        console.log(this.recipesList);
        try {
            const updateEdgeConfig = await fetch(
                'https://api.vercel.com/v1/edge-config/ecfg_w4sdfgplscisyg1hje0gnqmoaspw/items',
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer wG2YsX0dC2Hee9yL8CYQOIhS`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: [
                            {
                                operation: 'update',
                                key: 'recipes',
                                value: this.recipesList
                            }
                        ]
                    }),
                },
            );
            const result = await updateEdgeConfig.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

import { EdgeConfigValue, get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

import { States } from './states';
import { Measurements } from './measurements';

@Component({
    selector: 'app-recipe-page-create-update',
    standalone: true,
    templateUrl: './recipe-page-create-update.component.html',
    styleUrls: ['./recipe-page-create-update.component.css'],
    imports: [
        FormsModule,
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
    ],
    providers: [DatePipe]
})
export class RecipePageCreateUpdateComponent implements OnInit {
    measurements = Measurements;
    recipeForm!: FormGroup;
    recipesList?: any[];
    router = inject(Router);
    private linkEditDataId: string = "";
    private recipeToEdit!: any;
    private recipeToEditIndex!: any;
    private routerUrl = '/main-page';
    private state: States = States.UNKNOWN;

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) { }

    addNewIngredient(inputItem: string = '', inputAmount: string = '', inputMeasure: string = '') {
        const fIngr = (this.recipeForm.get('inputIngredients') as FormArray);
        fIngr.push(this.fb.group({
            item: inputItem,
            amount: inputAmount,
            measure: inputMeasure,
        }));
    }

    addNewStage(inputText: string = '') {
        const fa = (this.recipeForm.get('inputStages') as FormArray);
        fa.push(this.fb.group({
            text: inputText,
        }));
    }

    async GET() {
        var client = await createClient(environment.EDGE_CONFIG, {
            cache: 'no-store',
        }).get(environment.KEY_RECIPE_ELEMENT);
        return client;
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

    get inputStages(): FormArray {
        return this.recipeForm.get('inputStages') as FormArray;
    }

    get inputIngredients(): FormArray {
        return this.recipeForm.get('inputIngredients') as FormArray;
    }

    ngOnInit(): void {
        var resultGet = this.GET();
        resultGet.then(data => {
            this.recipesList = JSON.parse(JSON.stringify(data));
            this.linkEditDataId = this.activatedRoute.snapshot.params["id"];
            this.state = this.linkEditDataId ? States.EDIT : States.CREATE;
            switch(this.state) {
                case States.EDIT:
                    this.recipeToEditIndex = this.recipesList?.findIndex(x => x.id == this.linkEditDataId);
                    this.recipeToEdit = this.recipesList![this.recipeToEditIndex!];
                    this.recipeForm = this.fb.group({
                        inputName: this.recipeToEdit.name,
                        inputIngredients: this.recipeToEdit.ingredients ? this.fb.array(this.recipeToEdit.ingredients.map((x: any) => this.getIngredientValuesFromGroup(x))) : [],
                        inputStages: this.recipeToEdit.stages ? this.fb.array(this.recipeToEdit.stages.map((x: any) => this.getStagesFromGroup(x))) : [],
                    })
                    break;
                case States.CREATE:
                    this.recipeForm = this.fb.group({
                        inputName: ['', Validators.required],
                        inputIngredients: this.fb.array([]),
                        inputStages: this.fb.array([]),
                    });
                    const fa = (this.recipeForm.get('inputStages') as FormArray);
                    const fIngr = (this.recipeForm.get('inputIngredients') as FormArray);
                    this.addNewStage();
                    this.addNewIngredient();
                    break;
            };
        });
    }

    async onSubmit() {
        this.recipeForm.get('inputStages') as FormArray;
        this.recipeForm.get('inputIngredients') as FormArray;
        var resultObject = this.recipeForm.value;
        var newRecipe = {
            id: '',
            name: '',
            date: '',
            recipeimg: 'It will be a img of recipe',
            ingredients: '',
            stages: '',
        };
        switch(this.state) {
            case States.EDIT:
                newRecipe = {
                    id: this.recipeToEdit.id,
                    name: resultObject.inputName,
                    date: this.recipeToEdit.date,
                    recipeimg: 'It will be a img of recipe',
                    ingredients: resultObject.inputIngredients,
                    stages: resultObject.inputStages,
                }
                this.recipesList![this.recipeToEditIndex] = newRecipe;
                break;
            case States.CREATE:
                newRecipe = {
                    id: uuidv4(),
                    name: resultObject.inputName,
                    date: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
                    recipeimg: 'It will be a img of recipe',
                    ingredients: resultObject.inputIngredients,
                    stages: resultObject.inputStages,
                }
                this.recipesList?.unshift(newRecipe);
                break;
        }
        this.routerUrl = `/recipe-page/${newRecipe.id}`;
        const result = await this.sendDataToServer()
        if (result.status == "ok") {
            this.openSnackBar();
            setTimeout(() => {
                this.router.navigateByUrl(this.routerUrl);
            }, 5000);
        }
    }

    openSnackBar() {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 5000,
        });
    }

    async sendDataToServer() {
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
            return result;
        } catch (error) {
            return error;
        }
    }
}
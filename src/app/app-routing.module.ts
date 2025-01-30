import { MainPageComponent } from './main-page/main-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { RecipePageCreateUpdateComponent } from './recipe-page-create-update/recipe-page-create-update.component';
import { NoFoundComponent } from './no-found/no-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './routes';

// const routes: Routes = [
//   { path: 'main-page', component: MainPageComponent},
//   { path: 'recipe-page/:id', component: RecipePageComponent},
//   { path: 'recipe-page-create-update', component: RecipePageCreateUpdateComponent},
//   { path: 'recipe-edit/:id', component: RecipePageCreateUpdateComponent},
//   { path: '', redirectTo:'/main-page', pathMatch: 'full'},
//   { path: '**', component: NoFoundComponent},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

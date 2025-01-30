import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { RecipePageCreateUpdateComponent } from './recipe-page-create-update/recipe-page-create-update.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { LoginComponent } from './auth-components/login/login.component';
import { RegistrationComponent } from './auth-components/registration/registration.component';

export const routes: Routes = [
  { path: 'main-page', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'recipe-page/:id', component: RecipePageComponent},
  { path: 'recipe-page-create-update', component: RecipePageCreateUpdateComponent},
  { path: 'recipe-edit/:id', component: RecipePageCreateUpdateComponent},
  { path: '', redirectTo:'/main-page', pathMatch: 'full'},
  { path: '**', component: NoFoundComponent},
];
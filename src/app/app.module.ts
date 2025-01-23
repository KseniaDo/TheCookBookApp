import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './common/header/header.component';
import { MenuComponent } from './common/menu/menu.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { MainPageComponent } from './main-page/main-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
    MenuComponent,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    RecipeCardComponent,
    MainPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

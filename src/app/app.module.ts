import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './common/header/header.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LogControlComponent } from './auth-components/log-control/log-control.component';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { environment } from 'src/environments/environment.development';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
    LogControlComponent,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    RecipeCardComponent,
    MainPageComponent,
  ],
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth())
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

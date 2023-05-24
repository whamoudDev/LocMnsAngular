import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './vues/connexion/connexion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AjoutEditionGestionnaireComponent } from './vues/ajoutEditionGestionnaire/ajouteditiongestionnaire.component';
import { MatSelectModule } from '@angular/material/select';
import { AjoutEditionSuperAdminComponent } from './vues/ajoutEditionSuperAdmin/ajouteditionsuperadmin.component';
import { AccueilComponent } from './vues/accueil/accueil.component';
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AjoutEditionGestionnaireComponent,
    AjoutEditionSuperAdminComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';


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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AjoutEditionGestionnaireComponent } from './vues/ajoutEditionGestionnaire/ajouteditiongestionnaire.component';
import { MatSelectModule } from '@angular/material/select';
import { AjoutEditionSuperAdminComponent } from './vues/ajoutEditionSuperAdmin/ajouteditionsuperadmin.component';
import { AccueilComponent } from './vues/accueil/accueil.component';
import { PageUtilisateurComponent } from './vues/page-utilisateur/page-utilisateur.component';
import { ReservationComponent } from './vues/reservation/reservation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RetourProlongationComponent } from './vues/retour-prolongation/retour-prolongation.component';
import { SignalementComponent } from './vues/signalement/signalement.component';
import { CategorieLocationComponent } from './vues/categorie-location/categorie-location.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { IsGestionnairePipe } from './pipes/is-gestionnaire.pipe';
import { Page403Component } from './vues/page403/page403/page403.component';
import { IsUtilisateurPipe } from './pipes/is-utilisateur.pipe';
import { Page404Component } from './vues/page404/page404/page404.component';
import { DashboardGestionnaireComponent } from './vues/dashboard-gestionnaire/dashboard-gestionnaire.component';
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AjoutEditionGestionnaireComponent,
    AjoutEditionSuperAdminComponent,
    AccueilComponent,
    PageUtilisateurComponent,
    ReservationComponent,
    SignalementComponent,
    RetourProlongationComponent,
    CategorieLocationComponent,
    IsGestionnairePipe,
    Page403Component,
    IsUtilisateurPipe,
    Page404Component,
    DashboardGestionnaireComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

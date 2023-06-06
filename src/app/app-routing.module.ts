import { CategorieLocationComponent } from './vues/categorie-location/categorie-location.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './vues/connexion/connexion.component';
import { AjoutEditionGestionnaireComponent } from './vues/ajoutEditionGestionnaire/ajouteditiongestionnaire.component';
import { AjoutEditionSuperAdminComponent } from './vues/ajoutEditionSuperAdmin/ajouteditionsuperadmin.component';
import { AccueilComponent } from './vues/accueil/accueil.component';
import { PageUtilisateurComponent } from './vues/page-utilisateur/page-utilisateur.component';
import { ReservationComponent } from './vues/reservation/reservation.component';
import { SignalementComponent } from './vues/signalement/signalement.component';
import { RetourProlongationComponent } from './vues/retour-prolongation/retour-prolongation.component';
import { Page403Component } from './vues/page403/page403/page403.component';
import { GestionnaireGuard } from './guards/gestionnaire.guard';
import { UtilisateurGuard } from './guards/utilisateur.guard';
import { Page404Component } from './vues/page404/page404/page404.component';
import { DashboardGestionnaireComponent } from './vues/dashboard-gestionnaire/dashboard-gestionnaire.component';
import { FicheProduitComponent } from './vues/fiche-produit/fiche-produit.component';
const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },

  {
    path: 'ajoutEditionGestionnaire',
    component: AjoutEditionGestionnaireComponent,
    canActivate: [GestionnaireGuard],
  },

  {
    path: 'ajoutEditionGestionnaire/:id',
    component: AjoutEditionGestionnaireComponent,
    canActivate: [GestionnaireGuard],
  },

  {
    path: 'ajoutEditionSuperAdmin',
    component: AjoutEditionSuperAdminComponent,
    canActivate: [GestionnaireGuard],
  },
  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [UtilisateurGuard],
  },
  {
    path: 'dashboardgestionnaire',
    component: DashboardGestionnaireComponent,
    canActivate: [GestionnaireGuard],
  },
  {
    path: 'page-utilisateur',
    component: PageUtilisateurComponent,
    canActivate: [UtilisateurGuard],
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [UtilisateurGuard],
  },

  {
    path: 'reservation/:id',
    component: ReservationComponent,
    canActivate: [UtilisateurGuard],
  },
  {
    path: 'signalement',
    component: SignalementComponent,
    canActivate: [UtilisateurGuard],
  },
  {
    path: 'retour-prolongation',
    component: RetourProlongationComponent,
    canActivate: [UtilisateurGuard],
  },

  {
    path: 'categorie-location',
    component: CategorieLocationComponent,
    canActivate: [UtilisateurGuard],
  },
  {
    path: 'fiche-produit',
    component: FicheProduitComponent,
    canActivate: [UtilisateurGuard],
  },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'page403', component: Page403Component },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

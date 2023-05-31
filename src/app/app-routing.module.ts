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
const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },

  {
    path: 'ajoutEditionGestionnaire',
    component: AjoutEditionGestionnaireComponent,
  },

  {
    path: 'ajoutEditionGestionnaire/:id',
    component: AjoutEditionGestionnaireComponent,
  },

  {
    path: 'ajoutEditionSuperAdmin',
    component: AjoutEditionSuperAdminComponent,
  },
  { path: 'accueil', component: AccueilComponent },
  { path: 'page-utilisateur', component: PageUtilisateurComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'signalement', component: SignalementComponent },
  { path: 'retour-prolongation', component: RetourProlongationComponent },
  { path: 'categorie-location', component : CategorieLocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

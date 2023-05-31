import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './vues/connexion/connexion.component';
import { AjoutEditionGestionnaireComponent } from './vues/ajoutEditionGestionnaire/ajouteditiongestionnaire.component';
import { AjoutEditionSuperAdminComponent } from './vues/ajoutEditionSuperAdmin/ajouteditionsuperadmin.component';
import { AccueilComponent } from './vues/accueil/accueil.component';
import { Page403Component } from './vues/page403/page403/page403.component';
import { GestionnaireGuard } from './guards/gestionnaire.guard';
import { UtilisateurGuard } from './guards/utilisateur.guard';
import { Page404Component } from './vues/page404/page404/page404.component';
import { DashboardGestionnaireComponent } from './vues/dashboard-gestionnaire/dashboard-gestionnaire.component';
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
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'page403', component: Page403Component },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

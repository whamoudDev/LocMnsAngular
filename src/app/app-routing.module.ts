import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './vues/connexion/connexion.component';
import { AjoutEditionGestionnaireComponent } from './vues/ajoutEditionGestionnaire/ajouteditiongestionnaire.component';
import { AjoutEditionSuperAdminComponent } from './vues/ajoutEditionSuperAdmin/ajouteditionsuperadmin.component';
import { AccueilComponent } from './vues/accueil/accueil.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

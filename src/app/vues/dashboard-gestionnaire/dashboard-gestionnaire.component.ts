import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/modele/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-dashboard-gestionnaire',
  templateUrl: './dashboard-gestionnaire.component.html',
  styleUrls: ['./dashboard-gestionnaire.component.scss'],
})
export class DashboardGestionnaireComponent {


  constructor(private serviceConnexion: ConnexionService) {}

  gestionnaireConnecte: Utilisateur | null = null;

  ngOnInit() {

    if (this.serviceConnexion._utilisateurConnecte != null){

          this.gestionnaireConnecte = this.serviceConnexion._utilisateurConnecte.value;

          console.log("utilisateur du  service : ",this.serviceConnexion._utilisateurConnecte.value);
          console.log("utilisateur local",this.gestionnaireConnecte);
    }
      
  }
}

import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/modele/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-dashboard-gestionnaire',
  templateUrl: './dashboard-gestionnaire.component.html',
  styleUrls: ['./dashboard-gestionnaire.component.scss'],
})
export class DashboardGestionnaireComponent {
  //Variables
  gestionnaireConnecte: Utilisateur | null = null;

  nbDemandeReservation: number = 0;
  nbDemandeRetour: number = 0;
  nbDemandeProlongation: number = 0;
  nbAlerte: number = 0;
  nbReparation: number = 0;
  nbLocationNonRestitue: number = 0;
  nbLocationEnCours: number = 0;
  nbStock: number = 0;
  nbHistorique: number = 0;

  constructor(private serviceConnexion: ConnexionService) {}

  ngOnInit() {
    if (this.serviceConnexion._utilisateurConnecte != null) {
      this.gestionnaireConnecte =
        this.serviceConnexion._utilisateurConnecte.value;

      console.log(
        'utilisateur du  service : ',
        this.serviceConnexion._utilisateurConnecte.value
      );
      console.log('utilisateur local', this.gestionnaireConnecte);
    }
  }

  onDeconnexion(){

    this.serviceConnexion.deconnexion();
  }
}

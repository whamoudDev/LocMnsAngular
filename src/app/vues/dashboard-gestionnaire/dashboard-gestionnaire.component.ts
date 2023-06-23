import { Component } from '@angular/core';
import { Alerte } from 'src/app/modele/alerte';
import { Reparation } from 'src/app/modele/reparation';
import { Reservation } from 'src/app/modele/reservation';
import { Utilisateur } from 'src/app/modele/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';
import { GdashboardService } from 'src/app/services/gdashboard.service';

@Component({
  selector: 'app-dashboard-gestionnaire',
  templateUrl: './dashboard-gestionnaire.component.html',
  styleUrls: ['./dashboard-gestionnaire.component.scss'],
})
export class DashboardGestionnaireComponent {
  //Variables
  gestionnaireConnecte?: Utilisateur | null = {};

  nbDemandeReservation: number = 0;
  nbDemandeRetour: number = 0;
  nbDemandeProlongation: number = 0;
  nbAlerteATraiter: number = 0;
  nbReparation: number = 0;
  nbLocationNonRestitue: number = 0;
  nbReservationEnCours: number = 0;
  nbStockDisponible: number = 0;
  nbHistorique: number = 0;

  constructor(
    private serviceConnexion: ConnexionService,
    private serviceGdashboard: GdashboardService
  ) {}

  ngOnInit() {
    if (this.serviceConnexion._utilisateurConnecte != null) {
      this.gestionnaireConnecte =
        this.serviceConnexion._utilisateurConnecte.value;
      console.log('utilisateur local', this.gestionnaireConnecte);
    }

    this.serviceGdashboard.getHistoriqueAlerte().subscribe({
      next: (listeAlerte: Alerte[]) => {
        this.nbHistorique = listeAlerte.length;
      },
      error: (erreur) => console.log(erreur),
    });

    this.serviceGdashboard.getAlerteNonTraite().subscribe({
      next: (listAlerteNonTraite: Alerte[]) => {
        this.nbAlerteATraiter = listAlerteNonTraite.length;
        console.log('AlerteATraiter', listAlerteNonTraite);
        console.log('NBAlerteATraiter :', this.nbAlerteATraiter);
      },
      error: (erreur) => console.log(erreur),
    });

    this.serviceGdashboard.getDemandeReservationNonTraite().subscribe({
      next: (listAlerteReservationNonTraite: Alerte[]) => {
        this.nbDemandeReservation = listAlerteReservationNonTraite.length;
        console.log('ReservationATraiter', listAlerteReservationNonTraite);
        console.log('NBReservationATraiter :', listAlerteReservationNonTraite);
      },
      error: (erreur) => console.log(erreur),
    });

    this.serviceGdashboard.getDemandeRetourNonTraite().subscribe({
      next: (listAlerteDemandeRetourNonTraite: Alerte[]) => {
        this.nbDemandeRetour = listAlerteDemandeRetourNonTraite.length;
      },
      error: (erreur) => console.log(erreur),
    });

    this.serviceGdashboard.getDemandeProlongationNonTraite().subscribe({
      next: (listAlerteDemandeProlongationNonTraite: Alerte[]) => {
        this.nbDemandeProlongation =
          listAlerteDemandeProlongationNonTraite.length;
      },
      error: (erreur) => console.log(erreur),
    });

    this.serviceGdashboard.getReparationEnCours().subscribe({
      next: (listReparationEnCours: Reparation[]) => {
        this.nbReparation = listReparationEnCours.length;
      },
      error: (erreur) => console.log(erreur),
    });

    this.serviceGdashboard.getReservationNonRendu().subscribe({
      next: (listReservationNonRendu: Reservation[]) => {
        this.nbLocationNonRestitue = listReservationNonRendu.length;
      },
    });
    this.serviceGdashboard.getReservationEnCours().subscribe({
      next: (listReservationEnCours: Reservation[]) => {
        this.nbReservationEnCours = listReservationEnCours.length;
      },
    });

    this.serviceGdashboard.getLocationDisponible().subscribe({
      next: (listLocationDisponible: Location[]) => {
        console.log('Location disponible : ', listLocationDisponible);
        this.nbStockDisponible = listLocationDisponible.length;
      },
    });
  }

  onDeconnexion() {
    this.serviceConnexion.deconnexion();
  }
}

import { Component } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { Location } from 'src/app/modele/location';
import { ConnexionService } from 'src/app/services/connexion.service';
import { TypelocationService } from 'src/app/services/typelocation.service';
import { TypeLocation } from 'src/app/modele/typeLocation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/modele/reservation';
@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss'],
})
export class PageUtilisateurComponent {
  listeReservation: Reservation[] = [];
  constructor(
    private servicelocation: LocationService,
    private servicetypelocation: TypelocationService,
    private servicereservation: ReservationService,
    

    private ConnexionService: ConnexionService,

    private router: Router
  ) {}

  // ngOnInit() {
  //   this.servicereservation
  //     .getListeReservation(idUtilisateur)
  //     .subscribe((reservations: Reservation[]) => {
  //       this.listeReservation = reservations;
  //       console.log(this.listeReservation);
  //     });

  // }
}

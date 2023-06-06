import { Location } from './../../modele/location';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/modele/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  RequiredValidator,
} from '@angular/forms';
import { Localisation } from 'src/app/modele/localisation';
import { TypeUtilisateur } from 'src/app/modele/typeUtilisateur';
import { LocalisationService } from 'src/app/services/localisation.service';
import { TypeUtilisateurService } from 'src/app/services/typeutilisateur.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  formulaire: FormGroup = this.formBuilder.group({
    numSerieLocation: ['', Validators.required],
    nomLocation: ['', [Validators.required]],
    cadreUtilisation: ['', [Validators.required]],
    dateDebutReservation: ['', Validators.required],
    dateFinPrevu: ['', Validators.required],
  });

  listecadreUtilisation: Reservation[] = [];

  //idLocation: number | undefined;
  //idLocation?: number;
   idReservation?: number ;

  codeRetour: number = 0;
  messageErreur: String = '';
  reservation: Reservation | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private servicereservation: ReservationService,
    private servicelocation: LocationService,
    private serviceUtilisateur: UtilisateurService //private http: HttpClient,
  ) {}

  ngOnInit() {
    // Récupération de la liste des CadreUtilisation
    this.servicereservation.getListeCadreUtilisation().subscribe({
      next: (listeCadreUtilisation) => {
        this.listecadreUtilisation = listeCadreUtilisation;
      },
      error: (erreur) => console.log(erreur),
    });

    //Récupération des informations de la location
    this.route.params.subscribe((parametres) => {
      this.idReservation = parametres['id'];

      if (this.idReservation != null) {

        //this.servicelocation.getListeLocationById(this.idLocation).subscribe({
        this.servicereservation.getReservation(this.idReservation).subscribe({
          next: (reservation: Reservation) => {
            this.reservation = reservation;
            this.formulaire
              .get('numSerieLocation')
              ?.setValue(reservation.location);

            this.formulaire.get('nomLocation')?.setValue(reservation.location);

            this.formulaire
              .get('cadreUtilisation')
              ?.setValue(reservation.cadreUtilisation);
            this.formulaire
              .get('dateDebutReservation')
              ?.setValue(reservation.dateDebutReservation);
            this.formulaire
              .get('dateFinPrevu')
              ?.setValue(reservation.dateFinPrevu);
          },
        });
      }
    });
  }
  onSubmit() {
    

    if (this.formulaire.valid) {
      const reservation: Reservation | null = this.formulaire.value;

      //Les donnees sont formatées en JSON sont ajoutées à un blob et le blob à un formData
      const donneesFormulaire = new FormData();
      donneesFormulaire.append(
        'reservation',
        new Blob([JSON.stringify(reservation)], { type: 'application/json' })
      );

      // Le formData est transmis au service qui Post les données et nous renvoi vers l'url
      this.servicereservation.demandeReservation(donneesFormulaire).subscribe(() => {
        this.router.navigateByUrl('page-utilisateur');
      });
    

//       if (this.formulaire.valid) {
//     const reservation: Reservation = this.formulaire.value;
//     this.servicereservation
//       .demandeReservation(reservation)
//       .subscribe((resultat) => this.router.navigateByUrl('page-utilisateur'));
//   }
// }

    }
  

  }}
   
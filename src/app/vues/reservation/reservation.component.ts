import { ConnexionService } from './../../services/connexion.service';
import { Location } from './../../modele/location';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/modele/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Component, PipeTransform } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from 'src/app/modele/CustomDateAdapter';
import { DateAdapter } from '@angular/material/core';

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
import { Utilisateur } from 'src/app/modele/utilisateur';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class ReservationComponent {
  formulaire: FormGroup = this.formBuilder.group({
    numSerieLocation: ['', Validators.required],
    nomLocation: ['', [Validators.required]],
    cadreUtilisation: ['', [Validators.required]],
    dateDebutReservation: ['', Validators.required],
    dateFinPrevu: ['', Validators.required],
  });

  listecadreUtilisation: string[] = ['Cours', 'Reunion', 'presentation'];

  idLocation: number = 0;
  reservation: Reservation = {};
  location: Location = {};

  codeRetour: number = 0;
  messageErreur: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private servicereservation: ReservationService,
    private servicelocation: LocationService,
    private serviceUtilisateur: UtilisateurService, //private http: HttpClient,
    private connexionService: ConnexionService
  ) {}

  ngOnInit() {
    //Récupération des informations de la location
    this.route.params.subscribe((parametres) => {
      this.idLocation = parametres['id'];
      console.log(this.idLocation);

      if (this.idLocation != null) {
        this.servicelocation.getListeLocationById(this.idLocation).subscribe({
          next: (location: Location) => {
            this.reservation.location = location;
            this.formulaire
              .get('numSerieLocation')
              ?.setValue(this.reservation.location.numSerieLocation);
            this.formulaire
              .get('nomLocation')
              ?.setValue(this.reservation.location.nomLocation);
          },
        });
      }
    });
    //Récupération des informations de l'utilisateur

    if (
      this.connexionService._utilisateurConnecte.value?.idUtilisateur !=
      undefined
    ) {
      this.serviceUtilisateur
        .getUtilisateur(
          this.connexionService._utilisateurConnecte.value.idUtilisateur
        )
        .subscribe({
          next: (utilisateur: Utilisateur) => {
            this.reservation.utilisateur = utilisateur;
          },
        });
    }
  }

  onSubmit() {
    if (this.formulaire.valid) {
      // let reservation: Reservation = this.formulaire.value;

      this.reservation.cadreUtilisation =
        this.formulaire.get('cadreUtilisation')?.value;
      this.reservation.dateDebutReservation = this.formulaire.get(
        'dateDebutReservation'
      )?.value;

      this.reservation.dateFinPrevu =
        this.formulaire.get('dateFinPrevu')?.value;
      console.log(this.reservation);

      //POUR UN REQUEST BODY
      //-----------------------
      // this.servicereservation
      //   .demandeReservation(this.reservation)
      //   .subscribe(() => {
      //     this.router.navigateByUrl('page-utilisateur');
      //   });

      //POUR UN REQUEST PART
      //-----------------------
      //Les donnees sont formaté en Json sont ajouté à un blob et le blob à un formData
      const donneesFormulaire = new FormData();
      donneesFormulaire.append(
        'reservation',
        new Blob([JSON.stringify(this.reservation)], {
          type: 'application/json',
        })
      );
      //Le formData est transmis au service utilisateur qui Post les données et nous redirige vers une autre page
      this.servicereservation
        .demandeReservation(donneesFormulaire)
        .subscribe((resultat) => this.router.navigateByUrl('page-utilisateur'));
    }
  }
}

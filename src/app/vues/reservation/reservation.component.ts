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
  idLocation: number=0;
  //idReservation?: number ;
  reservation?: Reservation;
  location: Location | null = null;

  public donneesReservation!: any;

  codeRetour: number = 0;
  messageErreur: String = '';

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
      this.idLocation = parametres['id'];
      console.log(this.idLocation);

      if (this.idLocation != null) {
        this.servicelocation.getListeLocationById(this.idLocation).subscribe({
          // this.servicere.getReservation(this.idReservation).subscribe({
          next: (location: Location) => {
            this.location = location;
            this.formulaire
              .get('numSerieLocation')
              ?.setValue(location.numSerieLocation);

            this.formulaire.get('nomLocation')?.setValue(location.nomLocation);
          },
        });
      }
    });
  }
  onSubmit() {
  if (this.formulaire.valid) {
    let reservation: Reservation = this.formulaire.value;

    this.servicelocation.getListeLocationById(this.idLocation).subscribe({
      next: (location: Location) => {
        reservation.location = location;

        this.servicereservation.demandeReservation(reservation).subscribe(() => {
          this.router.navigateByUrl('page-utilisateur');
        });
      },
    });
  }
}
}
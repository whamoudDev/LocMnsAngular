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

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {

  formulaire: FormGroup = this.formBuilder.group({
    numeroSerie: ['', Validators.required],
    nomLocation: ['', [Validators.required, Validators.minLength(3)]],
    cadreUtilisation: [null, []],
    dateDebutLocation: ['', Validators.required],
    dateFinLocation: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private servicereservation: ReservationService,
    private servicelocation: LocalisationService,

    //private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,

    private serviceUtilisateur: UtilisateurService
  ) {}
  idReservation: number | undefined;
  codeRetour: number = 0;
  messageErreur: String = '';
  listecadreUtilisation: Reservation[] = [];

ngOnInit() {
  // Récupération de la liste des CadreUtilisation
  this.servicereservation.getListeCadreUtilisation().subscribe({
    next: (listeCadreUtilisation) => {
      this.listecadreUtilisation = listeCadreUtilisation;
    },
    error: (erreur) => console.log(erreur),
  });






    //Récupération des informations de la location
    // this.route.params.subscribe((parametres) => {
    //   this.idLocation = parametres['id'];

    //   if (this.idLocation != null) {
    //     this.servicelocation.getlis(this.idReservation).subscribe({
    //       next: (reservation: Reservation) => {
    //         this.formulaire
    //           .get('dateDebutReservation')
    //           ?.setValue(reservation.dateDebutReservation);
    //         this.formulaire
    //           .get('dateFinPrevu')
    //           ?.setValue(reservation.dateFinPrevu);
    //         this.formulaire
    //           .get('cadreUtilisation')
    //           ?.setValue(reservation.Location);
    //         this.formulaire.get('')?.setValue(reservation.Location);
    //       },
    //       error: (erreurRequete: any) => {
    //         if (erreurRequete.status === 404) {
    //           this.codeRetour = 404;
    //         } else {
    //           this.codeRetour = 500;
    //           this.messageErreur = erreurRequete.message;
    //         }
    //       },
    //     });
    //   }
    // });
  }

}
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestionnaire } from 'src/app/modele/gestionnaire';
import { Localisation } from 'src/app/modele/localisation';
import { TypeUtilisateur } from 'src/app/modele/typeUtilisateur';
import { Utilisateur } from 'src/app/modele/utilisateur';
import { LocalisationService } from 'src/app/services/localisation.service';
import { TypeUtilisateurService } from 'src/app/services/typeutilisateur.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-ajoutgestionnaire',
  templateUrl: './ajouteditiongestionnaire.component.html',
  styleUrls: ['./ajouteditiongestionnaire.component.scss'],
})
export class AjoutEditionGestionnaireComponent {
  //Définition du formulaire et de ses règles
  formulaire: FormGroup = this.formBuilder.group({
    nomUtilisateur: ['', [Validators.required, Validators.minLength(3)]],
    prenomUtilisateur: ['', [Validators.required, Validators.minLength(3)]],
    adresseUtilisateur: ['', [Validators.required]],
    telephoneUtilisateur: ['', [Validators.required]],
    mailUtilisateur: ['', [Validators.required, Validators.email]],
    localisation: ['', [Validators.required]],
    typeUtilisateur: ['', [Validators.required]],
  });

  //Les listes
  listeLocalisation: Localisation[] = [];
  listeTypeUtilisateur: TypeUtilisateur[] = [];
  //Edition utilisateur existant
  idUtilisateur?: number;
  //Fichier
  fichierAjoutMultiple: File | null = null;
  //Erreur
  statusCode: number = 0;
  msgError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceUtilisateur: UtilisateurService,
    private serviceTypeUtilisateur: TypeUtilisateurService,
    private serviceLocalisation: LocalisationService
  ) {}

  ngOnInit() {
    //Récupération de la liste des localisation à l'initialisation
    this.serviceLocalisation.getListeLocalisationFromBdd().subscribe({
      next: (listeLocalisation) => {
        this.listeLocalisation = listeLocalisation;
      },
      error: (erreur) => console.log(erreur),
    });

    //Récupération de la liste des types d'utilisateur à l'initialisation
    this.serviceTypeUtilisateur.getListeTypeUtilisateurFromBdd().subscribe({
      next: (listeTypeUtilisateur) => {
        this.listeTypeUtilisateur = listeTypeUtilisateur;
        this.listeTypeUtilisateur = this.listeTypeUtilisateur.slice(1);
      },
      error: (erreur) => console.log(erreur),
    });

    //Récupération des informations d'un utilisateur existant pour son edition
    this.route.params.subscribe((parametres) => {
      this.idUtilisateur = parametres['id'];

      if (this.idUtilisateur != null) {
        this.serviceUtilisateur.getUtilisateur(this.idUtilisateur).subscribe({
          next: (utilisateur: Utilisateur) => {
            this.formulaire
              .get('nomUtilisateur')
              ?.setValue(utilisateur.nomUtilisateur);
            this.formulaire
              .get('prenomUtilisateur')
              ?.setValue(utilisateur.prenomUtilisateur);
            this.formulaire
              .get('adresseUtilisateur')
              ?.setValue(utilisateur.adresseUtilisateur);
            this.formulaire
              .get('telephoneUtilisateur')
              ?.setValue(utilisateur.telephoneUtilisateur);
            this.formulaire
              .get('mailUtilisateur')
              ?.setValue(utilisateur.mailUtilisateur);
            this.formulaire
              .get('localisation')
              ?.setValue(utilisateur.localisation);
            this.formulaire
              .get('typeUtilisateur')
              ?.setValue(utilisateur.typeUtilisateur);
          },
          error: (erreurRequete) => {
            if (erreurRequete.status === 404) {
              this.statusCode = 404;
            } else {
              this.statusCode = 500;
              this.msgError = erreurRequete.message;
            }
          },
        });
      }
    });
  }

  onSubmit() {
    //Si le formulaire est valide, on récupère les données du formulaire :

    if (this.formulaire.valid) {
      let utilisateur: Gestionnaire | Utilisateur | null = null;

      if (
        this.formulaire.get('typeUtilisateur')?.value.roleUtilisateur ==
        'ROLE_GESTIONNAIRE'
      ) {
        utilisateur = this.formulaire.value as Gestionnaire;
      } else {
        utilisateur = this.formulaire.value as Utilisateur;
      }

      //Les donnees sont formaté en Json sont ajouté à un blob et le blob à un formData
      const donneesFormulaire = new FormData();
      donneesFormulaire.append(
        'utilisateur',
        new Blob([JSON.stringify(utilisateur)], { type: 'application/json' })
      );

      //Le formData est transmis au service qui Post les données et nous renvoi vers l'url
      this.serviceUtilisateur
        .ajoutEditionUtilisateur(donneesFormulaire)
        .subscribe((resultat) =>
          this.router.navigateByUrl('ajoutEditionGestionnaire')
        );
    }
  }

  //Recuperation du fichier à la position 0 du tableau
  onFileAdded(event: any) {
    this.fichierAjoutMultiple = event.target.files[0];
  }

  //Comparaison des éléments de la liste avec celui de l'utilisateur
  compareLocalisation(lieuOption: any, lieuUtilisateur: any) {
    return (
      lieuUtilisateur != null &&
      lieuUtilisateur.idLocalisation == lieuOption.idLocalisation
    );
  }

  compareTypeUtilisateur(typeOption: any, typeUtilisateur: any) {
    return (
      typeUtilisateur != null &&
      typeUtilisateur.idTypeUtilisateur == typeOption.idTypeUtilisateur
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Gestionnaire } from 'src/app/modele/gestionnaire';
import { Localisation } from 'src/app/modele/localisation';
import { TypeUtilisateur } from 'src/app/modele/typeUtilisateur';
import { LocalisationService } from 'src/app/services/localisation.service';
import { TypeUtilisateurService } from 'src/app/services/typeutilisateur.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-ajouteditionsuperadmin',
  templateUrl: './ajouteditionsuperadmin.component.html',
  styleUrls: ['./ajouteditionsuperadmin.component.scss'],
})
export class AjoutEditionSuperAdminComponent {
  //Définition du formulaire et de ses règles
  formulaire: FormGroup = this.formBuilder.group({
    nomUtilisateur: ['', [Validators.required, Validators.minLength(3)]],
    prenomUtilisateur: ['', [Validators.required, Validators.minLength(3)]],
    adresseUtilisateur: ['', [Validators.required]],
    telephoneUtilisateur: ['', [Validators.required]],
    mailUtilisateur: ['', [Validators.required, Validators.email]],
    motDePasseUtilisateur: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        this.majusculeValidator,
        this.caractereSpecialValidator,
        this.chiffreValidator,
      ],
    ],
    motDePasseVerif: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        this.majusculeValidator,
        this.caractereSpecialValidator,
        this.chiffreValidator,
        this.mdpDifferentValidator,
      ],
    ],
    localisation: ['', [Validators.required]],
  });

  //Les listes
  listeLocalisation: Localisation[] = [];
  listeTypeUtilisateur: TypeUtilisateur[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
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
      },
      error: (erreur) => console.log(erreur),
    });
  }

  onSubmit() {
    //Si le formulaire est valide, on récupère les données du formulaire :

    if (this.formulaire.valid) {
      //D'abord l'ensemble des données
      const gestionnaireSuper: Gestionnaire = this.formulaire.value;

      for (let typeUtilisateur of this.listeTypeUtilisateur) {
        if (typeUtilisateur.roleUtilisateur == 'ROLE_SUPERADMIN') {
          gestionnaireSuper.typeUtilisateur = typeUtilisateur;
        }
      }

      //Les donnees sont formaté en Json sont ajouté à un blob et le blob à un formData
      const donneesFormulaire = new FormData();
      donneesFormulaire.append(
        'utilisateur',
        new Blob([JSON.stringify(gestionnaireSuper)], {
          type: 'application/json',
        })
      );

      //Le formData est transmis au service qui Post les données et nous renvoi vers l'url
      this.serviceUtilisateur
        .ajoutEditionUtilisateur(donneesFormulaire)
        .subscribe((resultat) => this.router.navigateByUrl('connexion'));
    }
  }

  majusculeValidator(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {
    const regexMajuscule = /[A-Z]/;
    if (!regexMajuscule.test(control.value)) {
      return { pasDeMajuscule: true };
    }

    return null;
  }

  caractereSpecialValidator(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {
    const regexCaractereSpecial = /[-!?$%]/;
    if (!regexCaractereSpecial.test(control.value)) {
      return { pasDeCaractereSpecial: true };
    }

    return null;
  }

  chiffreValidator(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {
    const regexCaractereSpecial = /[0-9]/;
    if (!regexCaractereSpecial.test(control.value)) {
      return { pasDeChiffre: true };
    }

    return null;
  }

  mdpDifferentValidator(): ValidatorFn {
    return (
      control: AbstractControl
    ): { [nomValidator: string]: boolean } | null => {
      const motDePasseUtilisateur = control.get('motDePasseUtilisateur');
      const motDePasseVerif = control.get('motDePasseVerif');

      if (
        motDePasseUtilisateur &&
        motDePasseVerif &&
        motDePasseUtilisateur.value !== motDePasseVerif.value
      ) {
        return { mdpDifferent: true };
      }

      return null;
    };
  }
}

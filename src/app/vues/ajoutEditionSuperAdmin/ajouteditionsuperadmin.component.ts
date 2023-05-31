import { HttpClient } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
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
  //Variable permettant de verifier la correspondance des mdp
  // mdp1: string = '';

  //Définition du formulaire et de ses règles de validation
  formulaire: FormGroup = this.formBuilder.group({
    nomUtilisateur: ['', [Validators.required, Validators.minLength(3)]],
    prenomUtilisateur: ['', [Validators.required, Validators.minLength(3)]],
    adresseUtilisateur: ['', [Validators.required]],
    telephoneUtilisateur: ['', [Validators.required]],
    mailUtilisateur: ['', [Validators.required, Validators.email]],
    localisation: ['', [Validators.required]],
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
        this.verifMdpWithContext(),
      ],
    ],
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

      //Le formData est transmis au service utilisateur qui Post les données et nous redirige vers une autre page
      this.serviceUtilisateur
        .ajoutEditionUtilisateur(donneesFormulaire)
        .subscribe((resultat) => this.router.navigateByUrl('connexion'));
    }
  }

  //Validateur pour une Majuscule minimum
  //Reçois un abstractControl dans lequel on peut recuperer la valeur de l'input avec .value
  //Retourne soit null, soit une erreur designe par nomValidator et sa valeur le boolean
  //null si il n'y a pas d'erreur soit le but recherche
  //true si il y a une erreur, empeche la validation du formulaire et permet l'affichage du mat-error cote html
  majusculeValidator(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {
    const regexMajuscule = /[A-Z]/;
    if (!regexMajuscule.test(control.value)) {
      return { pasDeMajuscule: true };
    }

    return null;
  }

  //Validateur pour un caractere spéciale minimum
  caractereSpecialValidator(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {
    const regexCaractereSpecial = /[-!?$%]/;
    if (!regexCaractereSpecial.test(control.value)) {
      return { pasDeCaractereSpecial: true };
    }

    return null;
  }

  //Validateur pour un chiffre minimum
  chiffreValidator(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {
    const regexCaractereSpecial = /[0-9]/;
    if (!regexCaractereSpecial.test(control.value)) {
      return { pasDeChiffre: true };
    }

    return null;
  }

  //Validateur pour verifier la correspondance des mots de passe
  verifMdpWithContext(): ValidatorFn {
    //La fonction intermédiaire retourne un validateur. Voir le commentaire dans la fonction verifMdp
    return (control: AbstractControl): ValidationErrors | null => {
      return this.verifMdp(control);
    };
  }

  verifMdp(
    control: AbstractControl
  ): { [nomValidator: string]: boolean } | null {

    // Affichage console des mots de passe quand le champ mot de passe de confirmation change
    // if (this.formulaire && this.formulaire.get("motDePasseUtilisateur")){
    // console.log('Champ1 : ',this.formulaire && this.formulaire.get('motDePasseUtilisateur')?.value);
    // console.log('Champ2 : ',control.value);
    // }

    //Le context de cette fonction n'est pas la classe d'ou la necessité de l'appeler
    //dans une autre fonction dont le context est la classe, afin de pouvoir utiliser this
    if (
      this.formulaire &&
      this.formulaire.get('motDePasseUtilisateur') &&
      this.formulaire.get('motDePasseUtilisateur')?.value !== control.value
    ) {
      //Retourne true si c'est en erreur, le validateur empeche le post du formulaire
      return { mdpDifferent: true };
    }

    //Retourne null si il n'y a pas d'erreur, le validateur permet le post du formulaire

    return null;
  }
}

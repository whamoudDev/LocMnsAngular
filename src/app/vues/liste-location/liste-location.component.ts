import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Localisation } from 'src/app/modele/localisation';
import { Location } from 'src/app/modele/location';
import { Photo} from 'src/app/modele/photo';
import { TypeLocation } from 'src/app/modele/typeLocation';
import { ConnexionService } from 'src/app/services/connexion.service';
import { LocalisationService } from 'src/app/services/localisation.service';
import { LocationService } from 'src/app/services/location.service';
import { PhotoService } from 'src/app/services/photo.service';
import { TypelocationService } from 'src/app/services/typelocation.service';

@Component({
  selector: 'app-liste-location',
  templateUrl: './liste-location.component.html',
  styleUrls: ['./liste-location.component.scss'],
})
export class ListeLocationComponent {
  //Les listes
  listeLocation: Location[] = [];
  listeTypeLocation: TypeLocation[] = [];
  listeLocalisation: Localisation[] = [];
  listePathsPhotos: string[] = [];

  //Formulaire
  formulaire: FormGroup = this.formBuilder.group({
    numSerieLocation: ['', [Validators.required, Validators.minLength(2)]],
    nomLocation: ['', [Validators.required, Validators.minLength(2)]],
    etatLocation: ['', [Validators.required, Validators.minLength(2)]],
    statutLocation: ['', [Validators.required, Validators.minLength(2)]],
    descriptionLocation: ['', [Validators.required, Validators.minLength(2)]],
    localisation: ['', [Validators.required]],
    typeLocation: ['', [Validators.required]],
  });

  //Variables
  fichier: File | null = null;
  image: File | null = null;
  locationSelection: Location = {};
  pathPhotoLocation: string = '';
  

  constructor(
    private serviceLocation: LocationService,
    private serviceTypeLocation: TypelocationService,
    private serviceLocalisation: LocalisationService,
    private servicePhoto: PhotoService,
    private serviceConnexion: ConnexionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Récupération de la liste de toute les  location à l'initialisation
    this.serviceLocation.getListeLocation().subscribe({
      next: (listeLocation) => {
        this.listeLocation = listeLocation;
      },
      error: (erreur) => console.log(erreur),
    });

    //Récupération de la liste des types de location à l'initialisation
    this.serviceTypeLocation.getListeTypeLocation().subscribe({
      next: (listeTypeLocation) => {
        this.listeTypeLocation = listeTypeLocation;
      },
      error: (erreur) => console.log(erreur),
    });

    //Récupération de la liste des localisation à l'initialisation
    this.serviceLocalisation.getListeLocalisationFromBdd().subscribe({
      next: (listeLocalisation) => {
        this.listeLocalisation = listeLocalisation;
      },
      error: (erreur) => console.log(erreur),
    });

    ///////////////////////////////////////////////////
    //Récupération des informations d'une location existante pour son edition
    this.route.params.subscribe((parametres) => {
      this.locationSelection.idLocation = parametres['id'];
      if (this.locationSelection.idLocation) {
        this.serviceLocation
          .getListeLocationById(this.locationSelection.idLocation)
          .subscribe({
            next: (location: Location) => {
              this.locationSelection = location;
              console.log(' LOCATION SELECTIONNE : ', this.locationSelection);
              this.formulaire
                .get('numSerieLocation')
                ?.setValue(this.locationSelection.numSerieLocation);
              this.formulaire
                .get('nomLocation')
                ?.setValue(this.locationSelection.nomLocation);
              this.formulaire
                .get('etatLocation')
                ?.setValue(this.locationSelection.etatLocation);
              this.formulaire
                .get('statutLocation')
                ?.setValue(this.locationSelection.statutLocation);
              this.formulaire
                .get('descriptionLocation')
                ?.setValue(this.locationSelection.descriptionLocation);
              this.formulaire
                .get('typeLocation')
                ?.setValue(this.locationSelection.typeLocation);
              this.formulaire
                .get('localisation')
                ?.setValue(this.locationSelection.localisation);
            },
            error: (erreur) => console.log(erreur),
          });

        this.servicePhoto
          .getPhotosLocation(this.locationSelection.idLocation)
          .subscribe({
            next: (listePhoto: Photo[]) => {
              this.locationSelection.listePhotos = listePhoto;
              if (this.locationSelection.listePhotos.length > 0) {
                this.pathPhotoLocation =
                  'assets/images/' +
                  this.locationSelection.listePhotos[0].nomPhoto;
              }
            },
          });
      }
    });
  }

  onImageSelectionne(event: any) {
    this.image = event.target.files[0];
  }

  onDocSelectionne(event: any) {
    this.fichier = event.target.files[0];
  }

  //Comparaison des éléments de la liste avec celui de location
  compareLocalisation(lieuOption: Localisation, lieuLocation: Localisation) {
    return (
      lieuLocation != null &&
      lieuLocation.idLocalisation === lieuOption.idLocalisation
    );
  }

  //Comparaison des éléments de la liste avec celui du type de la location
  compareTypeLocation(typeOption: TypeLocation, typeLocation: TypeLocation) {
    return (
      typeLocation != null &&
      typeLocation.idTypeLocation === typeOption.idTypeLocation
    );
  }

  onSubmit() {
    if (this.formulaire.valid) {
      let location: Location = this.locationSelection;
      const donnees = new FormData();

      location = this.formulaire.value;
      if (this.locationSelection.idLocation != null) {
        location.idLocation = this.locationSelection.idLocation;
      }
      console.log('LOCATION AVANT update : ', location);
      if (this.image) {
        donnees.append('image', this.image);
      }
      if (this.fichier) {
        donnees.append('fichier', this.fichier);
      }

      donnees.append(
        'location',
        new Blob([JSON.stringify(location)], {
          type: 'application/json',
        })
      );

      console.log('FORMDATA : ', JSON.stringify(donnees));
      this.serviceLocation
        .ajoutEditionLocation(donnees)
        .subscribe((resultat) => {
          //Mise à jour de la liste de toute les locations pour la table
          this.serviceLocation.getListeLocation().subscribe({
            next: (listeLocation) => {
              this.listeLocation = listeLocation;
              this.router.navigateByUrl('listelocation');
            },
            error: (erreur) => console.log(erreur),
          });
        });
    }
  }

  onDelete() {
    if (this.locationSelection) {
      this.serviceLocation
        .deleteLocation(this.locationSelection.idLocation)
        .subscribe({
          next: (resultat) => {
            console.log('SUPPRESSION : ', resultat);
            if (this.locationSelection) {
              this.locationSelection = {};
              this.pathPhotoLocation = '';
              this.formulaire.get('numSerieLocation')?.setValue('');
              this.formulaire.get('nomLocation')?.setValue('');
              this.formulaire.get('etatLocation')?.setValue('');
              this.formulaire.get('statutLocation')?.setValue('');
              this.formulaire.get('descriptionLocation')?.setValue('');
              this.formulaire.get('typeLocation')?.setValue('');
              this.formulaire.get('localisation')?.setValue('');

              //Mise à jour de la liste de toute les locations pour la table
              this.serviceLocation.getListeLocation().subscribe({
                next: (listeLocation) => {
                  this.listeLocation = listeLocation;
                  this.router.navigateByUrl('listelocation');
                },
                error: (erreur) => console.log(erreur),
              });
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  onDeconnexion() {
    this.serviceConnexion.deconnexion();
  }
}

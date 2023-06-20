import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/modele/location';
import { LocationService } from 'src/app/services/location.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { TypelocationService } from 'src/app/services/typelocation.service';
import { TypeLocation } from 'src/app/modele/typeLocation';
@Component({
  selector: 'app-categorie-location',
  templateUrl: './categorie-location.component.html',
  styleUrls: ['./categorie-location.component.scss'],
})
export class CategorieLocationComponent {
  idTypeLocation?: number;
  listeLocation: Location[] = [];
  titreCategorie: string = '';
  typeLocation: TypeLocation={};


  constructor(
    private servicelocation: LocationService,
    private servicetypelocation: TypelocationService,
    private route: ActivatedRoute,
    private ConnexionService: ConnexionService,

    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      this.idTypeLocation = parametres['id'];

      if (this.idTypeLocation != null) {
        this.servicelocation
          .getListeLocation()
          .subscribe((locations: Location[]) => {
            console.log(locations);
            this.listeLocation = locations.filter(
              (loc) => loc.typeLocation?.idTypeLocation == this.idTypeLocation
            );
            //   (location: Location[]) =>
            //     location.typeLocation.libelleTypeLocation === 'ordinateur portable'
            // );
            //console.log(this.listeLocation);
          });
      }
    });

    //Récupération de la liste des types de location à l'initialisation
    if (this.idTypeLocation != null){
      this.servicetypelocation.getTypeLocation(this.idTypeLocation).subscribe({
        next: (typeLocation: TypeLocation) => {
          this.typeLocation = typeLocation;
        },
        error: (erreur) => console.log(erreur),
      });
    }
  }

  editReservation(idLocation: number) {
    this.router.navigateByUrl('/reservation/' + idLocation);
  }
}

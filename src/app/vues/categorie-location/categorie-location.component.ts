import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  listeLocation: Location[] = [];
  constructor(
    private servicelocation: LocationService,
    private servicetypelocation: TypelocationService,

    private ConnexionService: ConnexionService,

    private router: Router
  ) {}

  ngOnInit() {
    this.servicelocation
      .getListeLocation()
      .subscribe((locations: Location[]) => {
        this.listeLocation = locations.filter(
          (loc) => loc.nomLocation === 'ordinateur portable'
        );
        //   (location: Location[]) =>
        //     location.typeLocation.libelleTypeLocation === 'ordinateur portable'
        // );
        //console.log(this.listeLocation);
      });
  }

  editReservation(idLocation: number) {
    this.router.navigateByUrl('/reservation/' + idLocation);
  }


}





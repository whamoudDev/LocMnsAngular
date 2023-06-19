import { DocumentationService } from './../../services/documentation.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Documentation } from 'src/app/modele/documentation';
import { LocationService } from 'src/app/services/location.service';
import { PhotoService } from 'src/app/services/photo.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from 'src/app/modele/location';

@Component({
  selector: 'app-fiche-produit',
  templateUrl: './fiche-produit.component.html',
  styleUrls: ['./fiche-produit.component.scss'],
})
export class FicheProduitComponent {
  listeDocumentation: Documentation[] = [];
  documentation: Documentation = {};
  listeLocation: Location[] = [];
  idLocation: number = 0;
  location: Location[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private servicelocation: LocationService,
    private servicephoto: PhotoService,
    private servicedocumentation: DocumentationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.servicedocumentation
      .getListeDocumentation()
      .subscribe((documenation: Documentation[]) => {
        console.log(documenation);
        //this.listeDocumentation = documenation;
        this.listeDocumentation = documenation.filter(
          (doc) => doc.idDocumentation == 1
        );
      });
    if (this.servicelocation._locations.value?.idLocation !== undefined) {
      this.servicelocation
        .getListeLocationById(this.servicelocation._locations.value.idLocation)
        .subscribe((location: Location) => {
          console.log(location);
          this.documentation.location = {
            descriptionLocation: location.descriptionLocation,
            numSerieLocation: location.numSerieLocation,
          };
        });
    }
  }
}

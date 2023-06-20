import { DocumentationService } from './../../services/documentation.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  locationSelectionne: Location = {};

  constructor(
    private formBuilder: FormBuilder,
    private servicelocation: LocationService,
    private servicephoto: PhotoService,
    private servicedocumentation: DocumentationService,
    private router: Router,
    private route: ActivatedRoute,
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

      //Récupération des informations d'un utilisateur existant pour son edition
    this.route.params.subscribe((parametres) => {
      this.idLocation = parametres['id'];
    if (this.idLocation !== 0) {
      this.servicelocation
        .getListeLocationById(this.idLocation)
        .subscribe((location: Location) => {
          console.log(location);
          this.locationSelectionne = location;
          console.log("LOC : ",this.locationSelectionne);
          });
        }
      });
    
  }
}

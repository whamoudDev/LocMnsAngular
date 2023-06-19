import { DocumentationService } from './../../services/documentation.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Documentation } from 'src/app/modele/documentation';
import { LocationService } from 'src/app/services/location.service';
import { PhotosService } from 'src/app/services/photos.service';

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
    private servicephotos: PhotosService,
    private servicedocumentation: DocumentationService,
    private router: Router
  ) {}

  ngOnInit() {






    
  }
}

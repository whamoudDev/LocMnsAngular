import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-fiche-produit',
  templateUrl: './fiche-produit.component.html',
  styleUrls: ['./fiche-produit.component.scss'],
})
export class FicheProduitComponent {
  constructor(
    
private servicelocation: LocationService,
    private servicephotos: PhotosService,
    private router : Router
    
    
    
    ) {}

  ngOnInit() {






    
  }
}



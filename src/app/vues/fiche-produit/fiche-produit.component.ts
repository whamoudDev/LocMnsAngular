import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-fiche-produit',
  templateUrl: './fiche-produit.component.html',
  styleUrls: ['./fiche-produit.component.scss'],
})
export class FicheProduitComponent {
  constructor(
    private servicelocation: LocationService,
    private servicephotos: PhotoService,
    private router: Router
  ) {}

  ngOnInit() {}
}

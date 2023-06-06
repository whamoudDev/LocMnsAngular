import { Component } from '@angular/core';
import { Location } from 'src/app/modele/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-liste-location',
  templateUrl: './liste-location.component.html',
  styleUrls: ['./liste-location.component.scss']
})
export class ListeLocationComponent {

  //Les listes
  listeLocation: Location[]=[];  

  constructor(private serviceLocation : LocationService) { }

  ngOnInit() {

    //Récupération de la liste des localisation à l'initialisation
    this.serviceLocation.getListeLocation().subscribe({
      next: (listeLocation) => {
        this.listeLocation = listeLocation;
      },
      error: (erreur) => console.log(erreur),
    });
  }

}

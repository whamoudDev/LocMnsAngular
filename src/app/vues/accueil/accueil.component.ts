import { Component } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  constructor(private serviceConnexion : ConnexionService) {}

  ngOnInit(): void {}

  onDeconnexion(){

    this.serviceConnexion.deconnexion();
  }
}


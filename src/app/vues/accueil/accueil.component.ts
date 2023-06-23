import { Utilisateur } from './../../modele/utilisateur';
import { TypeUtilisateur } from './../../modele/typeUtilisateur';
import { UtilisateurService } from './../../services/utilisateur.service';
import { Component } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { TypeUtilisateurService } from 'src/app/services/typeutilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  listeUtilisateur: Utilisateur[] = [];
  lienTableauBord: boolean = false;

  constructor(
    private serviceConnexion: ConnexionService,
    private serviceutilisateur: UtilisateurService,
    private servicetypeutilisateur: TypeUtilisateurService
  ) {
    this.serviceConnexion._utilisateurConnecte.subscribe((utilisateur) => {
      console.log(utilisateur);
      if (
        utilisateur &&
        utilisateur.typeUtilisateur &&
        utilisateur.typeUtilisateur.roleUtilisateur === 'ROLE_GESTIONNAIRE'
      ) {
        this.lienTableauBord = true;
      } else {
        this.lienTableauBord = false;
      }
    });
  }

  ngOnInit(): void {}

  onDeconnexion() {
    this.serviceConnexion.deconnexion();
  }
}

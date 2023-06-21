import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../modele/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient, private router: Router) {
    this.majUtilisateurConnecte();
  }

  public _utilisateurConnecte: BehaviorSubject<Utilisateur | null> =
    new BehaviorSubject<Utilisateur | null>(null);

  //Poste les donnees saisie du formulaire connexion
  connexion(utilisateur: Utilisateur): Observable<any> {
    return this.http.post('http://51.178.26.87:8080/connexion', utilisateur, {
      responseType: 'text',
    });
  }

  //Supprime le token et renvoi sur la page de login
  deconnexion() {
    localStorage.removeItem('jwt');

    this._utilisateurConnecte.next(null);

    this.router.navigateByUrl('/connexion');
  }

  //Verifie l'existence d'un token jwt et si oui bind les données dans un objet Utilisateur avant de le stoker dans le service
  majUtilisateurConnecte() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      const data = jwt.split('.')[1];
      const json = window.atob(data);
      const donneesUtilisateur = JSON.parse(json);

      console.log(
        'Donnee Utilisateur reçu du serveur en Json : ',
        donneesUtilisateur
      );

      const utilisateur: Utilisateur = {
        idUtilisateur: donneesUtilisateur.idUtilisateur,
        nomUtilisateur: donneesUtilisateur.nomUtilisateur,
        prenomUtilisateur: donneesUtilisateur.prenomUtilisateur,
        adresseUtilisateur: donneesUtilisateur.adresseUtilisateur,
        telephoneUtilisateur: donneesUtilisateur.telephoneUtilisateur,
        mailUtilisateur: donneesUtilisateur.sub,
        //Il vaut mieux eviter que le serveur spring nous retourne un mot de passe
        //sinon il sera tout le temps accessible dans le LocalStorage .
        motDePasseUtilisateur: '',
        localisation: donneesUtilisateur.localisation,
        typeUtilisateur: donneesUtilisateur.typeUtilisateur,
      };
      console.log('Utilisateur une fois données Json bindé : ', utilisateur);

      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }
  }
}

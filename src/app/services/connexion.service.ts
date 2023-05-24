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

  connexion(utilisateur: Utilisateur): Observable<any> {
    return this.http.post('http://localhost:8082/connexion', utilisateur, {
      responseType: 'text',
    });
  }

  deconnexion() {
    localStorage.removeItem('jwt');

    this._utilisateurConnecte.next(null);

    this.router.navigateByUrl('/connexion');
  }

  majUtilisateurConnecte() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      const data = jwt.split('.')[1];
      const json = window.atob(data);
      const donneesUtilisateur = JSON.parse(json);
      console.log("donneeUtilisateur : ", donneesUtilisateur);
      const utilisateur: Utilisateur = {
        idUtilisateur: donneesUtilisateur.idUtilisateur,
        nomUtilisateur: donneesUtilisateur.nomUtilisateur,
        prenomUtilisateur: donneesUtilisateur.prenomUtilisateur,
        adresseUtilisateur: donneesUtilisateur.adresseUtilisateur,
        telephoneUtilisateur: donneesUtilisateur.telephoneUtilisateur,
        mailUtilisateur: donneesUtilisateur.sub,
        motDePasseUtilisateur : donneesUtilisateur.motDePasseUtilisateur,
        localisation: donneesUtilisateur.localisation,
        typeUtilisateur: donneesUtilisateur.typeUtilisateur
      };
      console.log('Utilisateur : ', utilisateur);
      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }
  }
}

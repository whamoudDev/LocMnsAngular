import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../modele/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  ajoutEditionUtilisateur(donneesFormulaire: FormData): Observable<any> {
    return this.http.post(
      'http://localhost:8082/ajoutEditionUtilisateur',
      donneesFormulaire,
      {
        responseType: 'text',
      }
    );
  }

  getAllUtilisateurs(): Observable<any> {
    return this.http.get('http://localhost:8082/liste-utilisateurs');
  }

  getUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.get('http://localhost:8082/utilisateur/' + idUtilisateur);
  }
  getUtilisateurByEmail(email: string): Observable<any> {
    return this.http.get('http://localhost:8082/utilisateurByEmail/' + email);
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.delete(
      'http://localhost:8082/utilisateur/' + idUtilisateur
    );
  }
}

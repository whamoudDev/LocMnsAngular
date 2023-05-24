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

  getUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.get('http://localhost:8082/utilisateur/' + idUtilisateur);
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.delete(
      'http://localhost:8080/utilisateur/' + idUtilisateur
    );
  }
}

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
      'http://51.178.26.87:8080/ajoutEditionUtilisateur',
      donneesFormulaire,
      {
        responseType: 'text',
      }
    );
  }

  getAllUtilisateurs(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/liste-utilisateurs');
  }

  getUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.get(
      'http://51.178.26.87:8080/utilisateur/' + idUtilisateur
    );
  }
  getUtilisateurByEmail(email: string): Observable<any> {
    return this.http.get(
      'http://51.178.26.87:8080/utilisateurByEmail/' + email
    );
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.delete(
      'http://51.178.26.87:8080/utilisateur/' + idUtilisateur
    );
  }
}

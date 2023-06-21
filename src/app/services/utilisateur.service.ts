import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../modele/utilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  ajoutEditionUtilisateur(donneesFormulaire: FormData): Observable<any> {
    return this.http.post(
      environment.serverUrl + '/ajoutEditionUtilisateur',
      donneesFormulaire,
      {
        responseType: 'text',
      }
    );
  }

  getAllUtilisateurs(): Observable<any> {
    return this.http.get(environment.serverUrl + '/liste-utilisateurs');
  }

  getUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/utilisateur/' + idUtilisateur
    );
  }
  getUtilisateurByEmail(email: string): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/utilisateurByEmail/' + email
    );
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.delete(
      environment.serverUrl + '/utilisateur/' + idUtilisateur
    );
  }
}

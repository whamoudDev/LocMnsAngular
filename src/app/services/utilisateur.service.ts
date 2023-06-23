import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  getAllUtilisateurs(): Observable<any> {
    return this.http.get(environment.serverUrl + '/users/liste-utilisateurs');
  }

  getUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/users/utilisateur/' + idUtilisateur
    );
  }

  getUtilisateurByEmail(email: string): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/users/utilisateurByEmail/' + email
    );
  }

  ajoutEditionUtilisateur(donneesFormulaire: FormData): Observable<any> {
    return this.http.post(
      environment.serverUrl + '/gestionnaire/ajoutEditionUtilisateur',
      donneesFormulaire,
      {
        responseType: 'text',
      }
    );
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<any> {
    return this.http.delete(
      environment.serverUrl + '/gestionnaire/utilisateur/' + idUtilisateur
    );
  }
}

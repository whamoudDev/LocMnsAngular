import { Injectable } from '@angular/core';
import { Localisation } from '../modele/localisation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeUtilisateur } from '../modele/typeUtilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeUtilisateurService {

  constructor(private http: HttpClient) {}

  public getListeTypeUtilisateurFromBdd(): Observable<TypeUtilisateur[]> {
    return this.http.get<TypeUtilisateur[]>(
      environment.serverUrl + '/users/type-utilisateurs'
    );
  }
}

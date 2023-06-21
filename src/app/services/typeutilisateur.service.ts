import { Injectable } from '@angular/core';
import { Localisation } from '../modele/localisation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeUtilisateur } from '../modele/typeUtilisateur';

@Injectable({
  providedIn: 'root',
})
export class TypeUtilisateurService {
  //private listeTypeUtilisateur: TypeUtilisateur[] = [];

  constructor(private http: HttpClient) {}

  public getListeTypeUtilisateurFromBdd(): Observable<TypeUtilisateur[]> {
    return this.http.get<TypeUtilisateur[]>(
      environment.serverUrl + 'type-utilisateurs'
    );
  }
}

import { Injectable } from '@angular/core';
import { Localisation } from '../modele/localisation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  //listeLocalisation: Localisation[] = [];
  constructor(private http: HttpClient) {}

  public getListeLocalisationFromBdd(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(
      environment.serverUrl + '/liste-localisations'
    );
  }
}

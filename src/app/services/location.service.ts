import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '../modele/location';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public _locations: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  // public getListeLocationById(idLocation: number): Observable<any> {
  //   return this.http.get<any>(
  //     environment.serverUrl + 'liste-locations/' + idLocation
  //   );
  // }

  public getListeLocationById(idLocation: number): Observable<Location> {
    return this.http.get<Location>(
      environment.serverUrl + 'liste-locations/' + idLocation
    );
  }

  public getListeLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.serverUrl + 'liste-locations');
  }

  ajoutEditionLocation(donneesFormulaire: FormData): Observable<any> {
    console.log('FORMDATA : ', donneesFormulaire);
    return this.http.post(
      environment.serverUrl + 'gestionnaire/ajoutEditionLocation',
      donneesFormulaire
    );
  }

  deleteLocation(idLocation?: number) {
    return this.http.delete(
      environment.serverUrl + 'gestionnaire/location/' + idLocation,
      {
        responseType: 'text',
      }
    );
  }
}

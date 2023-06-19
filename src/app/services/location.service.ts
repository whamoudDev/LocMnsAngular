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
  //     'http://localhost:8082/liste-locations/' + idLocation
  //   );
  // }

  public getListeLocationById(idLocation: number): Observable<Location> {
    return this.http.get<Location>(
      'http://localhost:8082/liste-locations/' + idLocation
    );
  }

  public getListeLocation(): Observable<Location[]> {
    return this.http.get<Location[]>('http://localhost:8082/liste-locations');
  }

  ajoutEditionLocation(donneesFormulaire: FormData): Observable<any> {
    console.log("FORMDATA : ", donneesFormulaire);
    return this.http.post(
      'http://localhost:8082/gestionnaire/ajoutEditionLocation',
      donneesFormulaire
    );
  }

  deleteLocation(idLocation?: number){
    return this.http.delete(
      'http://localhost:8082/gestionnaire/location/' + idLocation,
      {
        responseType: 'text',
      }
    );
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '../modele/location';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {


constructor(private http: HttpClient) {}

  public getListeLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(
      'http://localhost:8082/liste-locations'
    );
}
}

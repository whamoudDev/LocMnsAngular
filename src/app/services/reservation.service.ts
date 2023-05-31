import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../modele/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public getListeLocation(idReservation: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      'http://localhost:8082/utilisateur/reservations/{idReservation}'
    );
  }

  public getListeCadreUtilisation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      'http://localhost:8082/liste-cadres-utilisation"'
    );
  }
}

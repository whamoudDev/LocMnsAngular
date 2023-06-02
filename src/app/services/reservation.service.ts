import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../modele/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}
  public getListeCadreUtilisation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      'http://localhost:8082/liste-cadres-utilisation'
    );
  }

  public demandeReservation( donneesFormulaire: FormData): Observable<any> {
    return this.http.post(
      'http://localhost:8082/utilisateur/demandeReservation',
      donneesFormulaire,
      {
        responseType: 'text',
      }
      
    );
  }

  

  //  public ajoutLocation(idReservation: number, donneesFormulaire: FormData): Observable<Reservation[]> {
  //    return this.http.post<Reservation[]>(
  //  'http://localhost:8082/utilisateur/reservations/{idReservation}',

  //  donneesFormulaire,
  //   {
  //    responseType: 'text',
  //    });
}

  



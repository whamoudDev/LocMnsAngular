import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reservation } from '../modele/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  public _reservation: BehaviorSubject<Reservation | null> =
    new BehaviorSubject<Reservation | null>(null);

  constructor(private http: HttpClient) {}
  public getListeCadreUtilisation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      'http://localhost:8082/liste-cadres-utilisation'
    );
  }

  public demandeReservation(donneesFormulaire: FormData): Observable<any> {
    return this.http.post(
      'http://localhost:8082/demandeReservation',
      donneesFormulaire,
      {
        responseType: 'text',
      }
    );
  }

  // public demandeReservation(reservation: Reservation): Observable<any> {
  //   return this.http.post(
  //     'http://localhost:8082/demandeReservation',
  //     reservation,
  //     {
  //       responseType: 'text',
  //     }
  //   );
  // }

  getReservation(idReservation: number): Observable<any> {
    return this.http.get(
      'http://localhost:8082/liste-reservations/' + idReservation
    );
  }
}

  //  public ajoutLocation(idReservation: number, donneesFormulaire: FormData): Observable<Reservation[]> {
  //    return this.http.post<Reservation[]>(
  //  'http://localhost:8082/utilisateur/reservations/{idReservation}',

  //  donneesFormulaire,
  //   {
  //    responseType: 'text',
  //    });


  



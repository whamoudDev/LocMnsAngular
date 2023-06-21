import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reservation } from '../modele/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  public _reservation: BehaviorSubject<Reservation | null> =
    new BehaviorSubject<Reservation | null>(null);

  constructor(private http: HttpClient) {}

  // public getListeCadreUtilisation(): Observable<Reservation[]> {
  //   return this.http.get<Reservation[]>(
  //     'http://51.178.26.87:8080/liste-cadres-utilisation'
  //   );
  // }

  public demandeReservation(donneesFormulaire: FormData): Observable<any> {
    //POUR UN REQUEST BODY
    //-----------------------
    // console.log(donneesFormulaire);
    // const url = 'http://51.178.26.87:8080/demandeReservation';
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const jsonBody = JSON.stringify(donneesFormulaire);
    // return this.http.post(url, jsonBody, { headers });

    //POUR UN REQUEST PART
    //-----------------------
    console.log(donneesFormulaire);
    return this.http.post(
      'http://51.178.26.87:8080/demandeReservation',
      donneesFormulaire,
      {
        responseType: 'text',
      }
    );
  }

  getReservation(idReservation: number): Observable<any> {
    return this.http.get(
      'http://51.178.26.87:8080/reservation/' + idReservation
    );
  }
  public getListeReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      'http://51.178.26.87:8080/reservations'
    );
  }

  getListeReservationUtilisateur(
    idUtilisateur: number
  ): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      'http://51.178.26.87:8080/reservationUtilisateur/' + idUtilisateur
    );
  }
}

//  public ajoutLocation(idReservation: number, donneesFormulaire: FormData): Observable<Reservation[]> {
//    return this.http.post<Reservation[]>(
//  'http://51.178.26.87:8080/utilisateur/reservations/{idReservation}',

//  donneesFormulaire,
//   {
//    responseType: 'text',
//    });

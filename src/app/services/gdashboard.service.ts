import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GdashboardService {
  constructor(private http: HttpClient) {}

  getDemandeReservationNonTraite(): Observable<any> {
    return this.http.get(
      'http://51.178.26.87:8080/alertesReservationNonTraite'
    );
  }

  getDemandeRetourNonTraite(): Observable<any> {
    return this.http.get(
      'http://51.178.26.87:8080/alertesDemandeRetourNonTraite'
    );
  }

  getDemandeProlongationNonTraite(): Observable<any> {
    return this.http.get(
      'http://51.178.26.87:8080/alertesDemandeProlongationNonTraite'
    );
  }

  getAlerteNonTraite(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/alertesNonTraite');
  }

  getReparationEnCours(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/reparationEnCours');
  }

  getReservationNonRendu(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/reservationNonRendu');
  }

  getReservationEnCours(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/reservationEnCours');
  }

  getLocationDisponible(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/location-disponible');
  }

  getHistoriqueAlerte(): Observable<any> {
    return this.http.get('http://51.178.26.87:8080/alertes');
  }
}

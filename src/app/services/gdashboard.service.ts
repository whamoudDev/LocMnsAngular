import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GdashboardService {
  constructor(private http: HttpClient) {}

  getDemandeReservationNonTraite(): Observable<any> {
    return this.http.get(environment.serverUrl + 'alertesReservationNonTraite');
  }

  getDemandeRetourNonTraite(): Observable<any> {
    return this.http.get(
      environment.serverUrl + 'alertesDemandeRetourNonTraite'
    );
  }

  getDemandeProlongationNonTraite(): Observable<any> {
    return this.http.get(
      environment.serverUrl + 'alertesDemandeProlongationNonTraite'
    );
  }

  getAlerteNonTraite(): Observable<any> {
    return this.http.get(environment.serverUrl + 'alertesNonTraite');
  }

  getReparationEnCours(): Observable<any> {
    return this.http.get(environment.serverUrl + 'reparationEnCours');
  }

  getReservationNonRendu(): Observable<any> {
    return this.http.get(environment.serverUrl + 'reservationNonRendu');
  }

  getReservationEnCours(): Observable<any> {
    return this.http.get(environment.serverUrl + 'reservationEnCours');
  }

  getLocationDisponible(): Observable<any> {
    return this.http.get(environment.serverUrl + 'location-disponible');
  }

  getHistoriqueAlerte(): Observable<any> {
    return this.http.get(environment.serverUrl + 'alertes');
  }
}

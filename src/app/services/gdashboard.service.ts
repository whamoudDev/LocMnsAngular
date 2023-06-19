import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GdashboardService {
  constructor(private http: HttpClient) {}

  getDemandeReservationNonTraite(): Observable<any> {
    return this.http.get('http://localhost:8082/alertesReservationNonTraite');
  }

  getDemandeRetourNonTraite(): Observable<any> {
    return this.http.get('http://localhost:8082/alertesDemandeRetourNonTraite');
  }

  getDemandeProlongationNonTraite(): Observable<any> {
    return this.http.get(
      'http://localhost:8082/alertesDemandeProlongationNonTraite'
    );
  }

  getAlerteNonTraite(): Observable<any> {
    return this.http.get('http://localhost:8082/alertesNonTraite');
  }

  getReparationEnCours(): Observable<any> {
    return this.http.get('http://localhost:8082/reparationEnCours');
  }

  getReservationNonRendu(): Observable<any> {
    return this.http.get('http://localhost:8082/reservationNonRendu');
  }

  getReservationEnCours(): Observable<any> {
    return this.http.get('http://localhost:8082/reservationEnCours');
  }

  getLocationDisponible(): Observable<any> {
    return this.http.get('http://localhost:8082/location-disponible');
  }

  getHistoriqueAlerte(): Observable<any> {
    return this.http.get('http://localhost:8082/alertes');
  }
}

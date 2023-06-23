import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GdashboardService {
  constructor(private http: HttpClient) {}

  getDemandeReservationNonTraite(): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/gestionnaire/alertesReservationNonTraite'
    );
  }

  getDemandeRetourNonTraite(): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/gestionnaire/alertesDemandeRetourNonTraite'
    );
  }

  getDemandeProlongationNonTraite(): Observable<any> {
    return this.http.get(
      environment.serverUrl +
        '/gestionnaire/alertesDemandeProlongationNonTraite'
    );
  }

  getAlerteNonTraite(): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/gestionnaire/alertesNonTraite'
    );
  }

  getReparationEnCours(): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/gestionnaire/reparationEnCours'
    );
  }

  getReservationNonRendu(): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/gestionnaire/reservationNonRendu'
    );
  }

  getReservationEnCours(): Observable<any> {
    return this.http.get(
      environment.serverUrl + '/gestionnaire/reservationEnCours'
    );
  }

  getLocationDisponible(): Observable<any> {
    return this.http.get(environment.serverUrl + '/users/location-disponible');
  }

  getHistoriqueAlerte(): Observable<any> {
    return this.http.get(environment.serverUrl + '/gestionnaire/alertes');
  }
}

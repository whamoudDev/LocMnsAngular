import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeLocation } from '../modele/typeLocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypelocationService {
  constructor(private http: HttpClient) {}

  public getListeTypeLocation(): Observable<TypeLocation[]> {
    return this.http.get<TypeLocation[]>(
      environment.serverUrl + '/liste-typeLocations'
    );
  }

  public getTypeLocation(id: number): Observable<any> {
    return this.http.get<any>(environment.serverUrl + '/typeLocation/' + id);
  }
}

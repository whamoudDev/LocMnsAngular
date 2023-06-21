import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeLocation } from '../modele/typeLocation';

@Injectable({
  providedIn: 'root',
})
export class TypelocationService {
  constructor(private http: HttpClient) {}

  public getListeTypeLocation(): Observable<TypeLocation[]> {
    return this.http.get<TypeLocation[]>(
      'http://51.178.26.87:8080/liste-typeLocations'
    );
  }

  public getTypeLocation(id: number): Observable<any> {
    return this.http.get<any>('http://51.178.26.87:8080/typeLocation/' + id);
  }
}

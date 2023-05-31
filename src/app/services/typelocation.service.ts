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
      'http://localhost:8082/liste-typeLocations'
    );
  }
}

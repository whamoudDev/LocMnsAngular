import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Documentation } from '../modele/documentation';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentationService {
  constructor(private http: HttpClient) {}
  public getListeDocumentation(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(
      environment.serverUrl + 'liste-documentation'
    );
  }
}

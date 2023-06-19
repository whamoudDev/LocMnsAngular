import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../modele/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  // chargementImageProduit(location: Location) {
  //   console.log(location);
  //   if (location.photo != null) {
  //     this.http
  //       .get('http://localhost:8082/photoLocation' + location.idLocation, {
  //         responseType: 'blob',
  //       })
  //       .subscribe((donneeImage: any) => {
  //         location.photo = this.sanitizer.bypassSecurityTrustUrl(
  //          URL.createObjectURL(donneeImage)
  //         );
  //       });
  //   }
  // }

  getPhotosLocation(idLocation?: number): Observable<any> {
    return this.http.get(
      'http://localhost:8082/listePhotosLocation/' + idLocation
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../modele/location';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  // chargementImageProduit(location: Location) {
  //   console.log(location);
  //   if (location.photo != null) {
  //     this.http
  //       .get(environment.serverUrl + '/photoLocation' + location.idLocation, {
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
      environment.serverUrl + '/listePhotosLocation/' + idLocation
    );
  }
}

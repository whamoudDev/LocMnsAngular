import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../modele/location';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  chargementImageProduit(location: Location) {
    console.log(location);
    if (location.photo != null) {
      this.http
        .get('http://localhost:8082/photoLocation' + location, {
          responseType: 'blob',
        })
        .subscribe((donneeImage: any) => {
          location.photo.photoLocation = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(donneeImage)
          );
        });
    }
  }
}

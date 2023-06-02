import { Location } from '@angular/common';
export interface Reservation {
  idReservation: number;
  dateDebutReservation: Date;
  dateFinPrevu: Date;
  cadreUtilisation: String;
  dateRetourReel:Date;
  location:Location
}
import { Location } from './location';
export interface Reservation {
  idReservation: number;
  dateDebutReservation: Date;
  dateFinPrevu: Date;
  cadreUtilisation: String;
  dateRetourReel:Date;
  location:Location;
}
import { Location } from "./location";

export interface Reservation {
  idReservation: number;
  dateDebutReservation: Date;
  dateFinPrevu: Date;
  cadreUtilisation: string;
  dateRetourReel:Date;
  location:Location;
}
import { Location } from "./location";
import { Utilisateur } from "./utilisateur";

export interface Reservation {
  idReservation?: number;
  dateDebutReservation?: Date;
  dateFinPrevu?: Date;
  cadreUtilisation?: string;
  dateRetourReel?:Date;
  location?:Location;
  utilisateur?:Utilisateur;
}
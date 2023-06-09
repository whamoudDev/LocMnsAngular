import { Reparation } from './reparation';
import { Reservation } from './reservation';
import { TypeAlerte } from './typeAlerte';
import { Utilisateur } from './utilisateur';

export interface Alerte {
  idAlerte?: number;

  dateAlerte?: Date;

  descriptionAlerte?: string;

  statutAlerte?: string;

  dateTraitementAlerte?: Date;

  typeAlerte?: TypeAlerte;

  utilisateur: Utilisateur;

  reservation: Reservation;

  reparation: Reparation;
}

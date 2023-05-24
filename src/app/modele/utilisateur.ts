import { Localisation } from './localisation';
import { TypeUtilisateur } from './typeUtilisateur';

export interface Utilisateur {
  idUtilisateur: number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  adresseUtilisateur: string;
  mailUtilisateur: string;
  motDePasseUtilisateur: string;
  telephoneUtilisateur: string;
  typeUtilisateur: TypeUtilisateur;
  localisation: Localisation;
}

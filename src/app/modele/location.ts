import { TypeLocation } from './typeLocation';
import { Localisation } from './localisation';
import { Photo } from './photo';
import { Utilisateur } from './utilisateur';
import { Documentation } from './documentation';

export interface Location {
  idLocation?: number;
  nomLocation?: string;
  numSerieLocation?: string;
  etatLocation?: string;
  descriptionLocation?: string;
  statutLocation?: string;
  localisation?: Localisation;
  typeLocation?: TypeLocation;
  utilisateur?: Utilisateur;
  listePhotos?: Photo[];
  listeDocumentations?: Documentation[];
}

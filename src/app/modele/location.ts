import { TypeLocation } from "./typeLocation";
import { Localisation } from "./localisation";
import { Photos } from "./photos";

export interface Location {
  idLocation: number;
  nomLocation: string;
  numSerieLocation: string;
  etatLocation: string;
  descriptionLocation: String;
  localisation:Localisation;
  typeLocation:TypeLocation;
  photo:Photos;
}

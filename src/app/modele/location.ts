import { TypeLocation } from "./typeLocation";
import { Localisation } from "./localisation";

export interface Location {
  idLocation: number;
  nomLocation: string;
  numSerieLocation: string;
  etatLocation: string;
  descriptionLocation: String;
  localisation:Localisation;
  typeLocation:TypeLocation;
}

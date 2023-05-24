import { Utilisateur } from "./utilisateur";

export interface Gestionnaire extends Utilisateur {
superAdmin : boolean;
}

import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../modele/utilisateur';

@Pipe({
  name: 'isUtilisateur',
})
export class IsUtilisateurPipe implements PipeTransform {
  transform(utilisateur: Utilisateur): boolean {
    return (
      utilisateur.typeUtilisateur?.roleUtilisateur === 'ROLE_SUPERADMIN' ||
      utilisateur.typeUtilisateur?.roleUtilisateur === 'ROLE_GESTIONNAIRE' ||
      utilisateur.typeUtilisateur?.roleUtilisateur === 'ROLE_UTILISATEUR'
    );
  }
}

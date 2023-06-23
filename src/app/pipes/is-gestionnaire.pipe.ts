import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../modele/utilisateur';

@Pipe({
  name: 'isGestionnaire',
})
export class IsGestionnairePipe implements PipeTransform {
  transform(utilisateur: Utilisateur): boolean {
    return (
      utilisateur.typeUtilisateur?.roleUtilisateur === 'ROLE_SUPERADMIN' ||
      utilisateur.typeUtilisateur?.roleUtilisateur === 'ROLE_GESTIONNAIRE'
    );
  }
}

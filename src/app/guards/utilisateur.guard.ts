import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';
import { IsUtilisateurPipe } from '../pipes/is-utilisateur.pipe';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurGuard implements CanActivate {
  constructor(
    private serviceConnexion: ConnexionService,
    private router: Router
  ){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.serviceConnexion._utilisateurConnecte.value != null &&
      new IsUtilisateurPipe().transform(
        this.serviceConnexion._utilisateurConnecte.value
      )
    ) {
      return true;
    }

    return this.router.parseUrl('page403');
  }
}

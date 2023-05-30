import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';
import { IsGestionnairePipe } from '../pipes/is-gestionnaire.pipe';

@Injectable({
  providedIn: 'root',
})
export class GestionnaireGuard implements CanActivate {
  constructor(
    private serviceConnexion: ConnexionService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
   
   if(this.serviceConnexion._utilisateurConnecte.value != null && new IsGestionnairePipe().transform(this.serviceConnexion._utilisateurConnecte.value)) {
      return true;
    }

    return this.router.parseUrl('page403');
    }
}

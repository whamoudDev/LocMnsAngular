import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  formulaire: FormGroup = this.formBuilder.group({
    mailUtilisateur: ['', [Validators.required, Validators.email]],
    motDePasseUtilisateur: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private serviceConnexion: ConnexionService,
    private router: Router
  ) {}

  wrongLogin : boolean = false;


  onSubmit(): void {
    if (this.formulaire.valid) {
      this.serviceConnexion.connexion(this.formulaire.value).subscribe({
        next: (jwt) => {
        
          localStorage.setItem('jwt', jwt);
          this.serviceConnexion.majUtilisateurConnecte();
          this.router.navigateByUrl(
            '/accueil'
          );
        },
        error: (erreur) => {
          this.wrongLogin = true;
         console.log("erreur Login");
        },
      });
    }
  }
}

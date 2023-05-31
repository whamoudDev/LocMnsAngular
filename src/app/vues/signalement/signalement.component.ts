import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signalement',
  templateUrl: './signalement.component.html',
  styleUrls: ['./signalement.component.scss'],
})
export class SignalementComponent {
  formulaire: FormGroup = this.formBuilder.group({
    numeroSerie: ['', Validators.required],
    nomLocation: ['', [Validators.required, Validators.minLength(3)]],
    cadreUtilisation: ['', Validators.required],
    dateDebutLocation: ['', Validators.required],
    dateFinLocation: ['', Validators.required],
  });
  public listeNumSerieMateriels: any;
  private idUtilisateur!: number;
  public idLocation!: number;

  constructor(
    //public dialogRef: MatDialogRef<SignalementComponent>,

    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  public formControl: FormGroup = this.formBuilder.group({
    numeroSerie: ['', [Validators.required]],
    dateDysfonctionnement: ['', [Validators.required]], //Lien des éléments avec le HTML
    descriptif: ['', [Validators.required]], //Mettre le même nom que le champ sous Spring
  });

  onNoClick(): void {}
}

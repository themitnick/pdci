import { Component } from '@angular/core';

@Component({
  selector: 'app-statuts',
  standalone: true,
  templateUrl: './statuts.html',
})
export class Statuts {
  protected readonly chapters = [
    { title: 'Titre I — Dispositions générales', description: "Dénomination, siège, emblème, devise et objectifs du PDCI-RDA." },
    { title: 'Titre II — Des membres', description: "Conditions d'adhésion, droits et devoirs des militants, procédures disciplinaires." },
    { title: 'Titre III — Des organes du parti', description: "Structure organisationnelle : Congrès, Convention, Bureau Politique, Comité Central." },
    { title: 'Titre IV — Du Président du parti', description: "Modalités d'élection, attributions et prérogatives du Président." },
    { title: 'Titre V — Des finances', description: "Sources de financement, cotisations, gestion financière et contrôle des comptes." },
    { title: 'Titre VI — Dispositions finales', description: "Modification des statuts, dissolution, dispositions transitoires." },
  ];

  protected readonly lastRevision = '14 Octobre 2023';
}

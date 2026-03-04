import { Component } from '@angular/core';

@Component({
  selector: 'app-instances',
  standalone: true,
  templateUrl: './instances.html',
})
export class Instances {
  protected readonly instances = [
    {
      name: 'Le Congrès',
      role: 'Instance suprême du parti',
      missions: "Élit le Président du parti, adopte et modifie les statuts, définit les grandes orientations politiques.",
      frequency: 'Tous les 5 ans',
    },
    {
      name: 'La Convention',
      role: 'Instance politique majeure',
      missions: "Examine la situation politique nationale, prend des décisions stratégiques entre deux congrès.",
      frequency: 'Annuelle',
    },
    {
      name: 'Le Bureau Politique',
      role: 'Organe exécutif central',
      missions: "Met en œuvre les décisions du Congrès et de la Convention, dirige les affaires courantes du parti.",
      frequency: 'Mensuelle',
    },
    {
      name: 'Le Comité Central',
      role: 'Organe délibératif élargi',
      missions: "Contrôle la gestion du Bureau Politique, examine les rapports financiers et les orientations régionales.",
      frequency: 'Trimestrielle',
    },
  ];
}

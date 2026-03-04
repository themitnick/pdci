import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-crm-statistiques',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.scss',
})
export class CrmStatistiques {
  protected readonly kpis = [
    { label: 'Militants totaux', value: 45213, change: '+8.3%', positive: true },
    { label: 'Taux de cotisation', value: 73, suffix: '%', change: '+2.1%', positive: true },
    { label: 'Événements ce mois', value: 12, change: '+4', positive: true },
    { label: 'Taux d\'inactivité', value: 15, suffix: '%', change: '-1.5%', positive: true },
  ];

  protected readonly regionStats = [
    { region: 'Abidjan', militants: 15420, cotisations: 78, sections: 42 },
    { region: 'Bouaké', militants: 6830, cotisations: 71, sections: 18 },
    { region: 'Yamoussoukro', militants: 5210, cotisations: 82, sections: 14 },
    { region: 'Daloa', militants: 4580, cotisations: 65, sections: 12 },
    { region: 'San Pedro', militants: 3920, cotisations: 69, sections: 10 },
    { region: 'Korhogo', militants: 3440, cotisations: 74, sections: 9 },
    { region: 'Man', militants: 2850, cotisations: 60, sections: 8 },
    { region: 'Gagnoa', militants: 2963, cotisations: 68, sections: 7 },
  ];

  protected readonly demographics = [
    { tranche: '18-25 ans', pourcentage: 22, count: 9947 },
    { tranche: '26-35 ans', pourcentage: 31, count: 14016 },
    { tranche: '36-45 ans', pourcentage: 24, count: 10851 },
    { tranche: '46-55 ans', pourcentage: 14, count: 6330 },
    { tranche: '56-65 ans', pourcentage: 6, count: 2713 },
    { tranche: '65+ ans', pourcentage: 3, count: 1356 },
  ];

  protected readonly monthlyAdhesions = [
    { mois: 'Jan', valeur: 320 },
    { mois: 'Fév', valeur: 280 },
    { mois: 'Mar', valeur: 410 },
    { mois: 'Avr', valeur: 390 },
    { mois: 'Mai', valeur: 520 },
    { mois: 'Jun', valeur: 480 },
  ];

  protected readonly maxAdhesion = Math.max(...[320, 280, 410, 390, 520, 480]);

  protected getMaxMilitants(): number {
    return Math.max(...this.regionStats.map(r => r.militants));
  }
}

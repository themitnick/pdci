import { Component } from '@angular/core';

@Component({
  selector: 'app-organigramme',
  standalone: true,
  templateUrl: './organigramme.html',
})
export class Organigramme {
  protected readonly orgChart = [
    {
      level: 'Présidence',
      members: [{ name: 'Président du Parti', role: 'Président du PDCI-RDA', image: 'https://picsum.photos/seed/pres/200/200' }],
    },
    {
      level: 'Bureau Politique',
      members: [
        { name: 'Secrétaire Général', role: 'Secrétaire Général', image: 'https://picsum.photos/seed/sg/200/200' },
        { name: 'Trésorier Général', role: 'Trésorier Général', image: 'https://picsum.photos/seed/tg/200/200' },
        { name: 'Porte-parole', role: 'Porte-parole officiel', image: 'https://picsum.photos/seed/pp/200/200' },
      ],
    },
    {
      level: 'Secrétariats Exécutifs',
      members: [
        { name: 'Sec. Organisation', role: 'Organisation & Mobilisation', image: 'https://picsum.photos/seed/so/200/200' },
        { name: 'Sec. Communication', role: 'Communication & Médias', image: 'https://picsum.photos/seed/sc/200/200' },
        { name: 'Sec. Formation', role: 'Formation & Éducation politique', image: 'https://picsum.photos/seed/sf/200/200' },
        { name: 'Sec. Relations Int.', role: 'Relations Internationales', image: 'https://picsum.photos/seed/sri/200/200' },
      ],
    },
  ];
}

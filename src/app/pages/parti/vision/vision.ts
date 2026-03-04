import { Component } from '@angular/core';

@Component({
  selector: 'app-vision',
  standalone: true,
  templateUrl: './vision.html',
})
export class Vision {
  protected readonly values = [
    { icon: '🏛', title: 'Démocratie', description: "Promouvoir la gouvernance participative, le respect des institutions et les libertés fondamentales pour chaque citoyen." },
    { icon: '🤝', title: 'Unité', description: "Rassembler toutes les composantes de la société ivoirienne au-delà des clivages ethniques, régionaux et religieux." },
    { icon: '📈', title: 'Développement', description: "Construire une économie forte, diversifiée et inclusive au service du bien-être de tous les Ivoiriens." },
    { icon: '⚖️', title: 'Justice sociale', description: "Garantir l'égalité des chances, la redistribution équitable des richesses et la protection des plus vulnérables." },
    { icon: '🌍', title: 'Panafricanisme', description: "Porter l'idéal d'intégration africaine hérité du RDA et contribuer au rayonnement de l'Afrique dans le monde." },
    { icon: '💡', title: 'Progrès', description: "Embrasser l'innovation, la technologie et la modernité tout en préservant nos valeurs culturelles et notre identité." },
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-histoire',
  standalone: true,
  templateUrl: './histoire.html',
})
export class Histoire {
  protected readonly timeline = [
    { year: '1946', title: 'Fondation du PDCI-RDA', description: "Création du Parti Démocratique de Côte d'Ivoire par Félix Houphouët-Boigny, dans le cadre du Rassemblement Démocratique Africain à Bamako." },
    { year: '1960', title: "Indépendance de la Côte d'Ivoire", description: "Le PDCI-RDA conduit le pays vers l'indépendance. Félix Houphouët-Boigny devient le premier Président de la République." },
    { year: '1990', title: 'Avènement du multipartisme', description: "Transition vers le multipartisme. Le PDCI-RDA s'adapte au nouveau paysage politique et demeure un pilier de la démocratie ivoirienne." },
    { year: '1993', title: "Henri Konan Bédié à la Présidence", description: "Après le décès d'Houphouët-Boigny, Henri Konan Bédié lui succède et dirige le pays jusqu'en 1999." },
    { year: '2000s', title: 'Période de transition', description: "Le parti traverse une décennie de défis politiques, renforçant ses structures et sa base militante à travers le pays." },
    { year: '2018', title: 'Renouveau et modernisation', description: "Le PDCI-RDA engage un vaste chantier de modernisation de ses structures, de rajeunissement de ses cadres et de digitalisation." },
    { year: '2024', title: "Préparation de l'avenir", description: "Le parti se prépare activement aux échéances électorales, avec une vision renouvelée pour la Côte d'Ivoire de demain." },
  ];
}

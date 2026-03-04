import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly stats = [
    { value: '5M+', label: 'Militants' },
    { value: '31', label: 'Régions couvertes' },
    { value: '25+', label: 'Pays (Diaspora)' },
    { value: '1946', label: 'Année de fondation' },
  ];

  protected readonly latestNews = [
    {
      id: 1,
      category: 'Communiqué',
      title: "Déclaration du Bureau Politique sur la situation nationale",
      excerpt: "Le Bureau Politique du PDCI-RDA, réuni en session extraordinaire, a examiné la situation politique et sociale du pays...",
      date: '28 Fév 2026',
      image: 'https://picsum.photos/seed/news1/600/400',
    },
    {
      id: 2,
      category: 'Vie du Parti',
      title: "Tournée nationale du Président dans les régions du Nord",
      excerpt: "Dans le cadre du renforcement des structures locales, le Président du parti a entamé une tournée dans les régions septentrionales...",
      date: '25 Fév 2026',
      image: 'https://picsum.photos/seed/news2/600/400',
    },
    {
      id: 3,
      category: 'International',
      title: "Le PDCI-RDA renforce ses liens avec les partis frères africains",
      excerpt: "Une délégation du parti a participé au sommet des partis démocratiques africains tenu à Dakar, renforçant les alliances panafricaines...",
      date: '20 Fév 2026',
      image: 'https://picsum.photos/seed/news3/600/400',
    },
  ];

  protected readonly upcomingEvents = [
    {
      id: 1,
      day: '15',
      month: 'Mars',
      title: 'Grand Meeting de mobilisation — Abidjan',
      location: 'Stade Félix Houphouët-Boigny',
      type: 'Meeting',
    },
    {
      id: 2,
      day: '22',
      month: 'Mars',
      title: "Conférence de presse du Secrétaire Général",
      location: 'Siège du PDCI-RDA, Cocody',
      type: 'Conférence',
    },
    {
      id: 3,
      day: '05',
      month: 'Avr',
      title: 'Séminaire de formation des cadres régionaux',
      location: 'Yamoussoukro',
      type: 'Formation',
    },
  ];
}

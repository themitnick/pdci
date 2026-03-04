import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly quickLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Événements', path: '/evenements' },
    { label: 'Adhésion', path: '/adhesion' },
    { label: 'Faire un don', path: '/dons' },
  ];

  protected readonly partyLinks = [
    { label: 'Notre histoire', path: '/parti/histoire' },
    { label: 'Vision & Valeurs', path: '/parti/vision' },
    { label: 'Organigramme', path: '/parti/organigramme' },
    { label: 'Instances dirigeantes', path: '/parti/instances' },
    { label: 'Statuts', path: '/parti/statuts' },
  ];

  protected readonly resourceLinks = [
    { label: 'Communiqués', path: '/actualites' },
    { label: 'Galerie photos', path: '/actualites' },
    { label: 'Vidéos', path: '/actualites' },
    { label: 'Coordinations', path: '/contact' },
  ];
}

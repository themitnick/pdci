import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parti',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './parti.html',
  styleUrl: './parti.scss',
})
export class Parti {
  protected readonly subPages = [
    { label: 'Histoire', path: '/parti/histoire', icon: '📜' },
    { label: 'Vision & Valeurs', path: '/parti/vision', icon: '🎯' },
    { label: 'Organigramme', path: '/parti/organigramme', icon: '🏛' },
    { label: 'Instances', path: '/parti/instances', icon: '⚖️' },
    { label: 'Statuts', path: '/parti/statuts', icon: '📄' },
  ];
}

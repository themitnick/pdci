import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EventItem {
  id: number;
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  type: string;
  description: string;
  capacity: string;
}

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './evenements.html',
  styleUrl: './evenements.scss',
})
export class Evenements {
  protected readonly viewMode = signal<'list' | 'calendar'>('list');
  protected readonly filterType = signal('Tous');

  protected readonly eventTypes = ['Tous', 'Meeting', 'Conférence', 'Tournée', 'Formation', 'Diaspora'];

  protected readonly events: EventItem[] = [
    { id: 1, day: '15', month: 'Mars', year: '2026', title: 'Grand Meeting de mobilisation — Abidjan', location: 'Stade Félix Houphouët-Boigny', type: 'Meeting', description: "Rassemblement national de mobilisation des militants en préparation des échéances électorales.", capacity: '50 000' },
    { id: 2, day: '22', month: 'Mars', year: '2026', title: 'Conférence de presse du Secrétaire Général', location: 'Siège du PDCI-RDA, Cocody', type: 'Conférence', description: "Présentation de la feuille de route du parti pour le second trimestre.", capacity: '200' },
    { id: 3, day: '05', month: 'Avr', year: '2026', title: 'Séminaire de formation des cadres régionaux', location: 'Yamoussoukro', type: 'Formation', description: "Session de formation pour les coordinateurs régionaux et les responsables de section.", capacity: '500' },
    { id: 4, day: '12', month: 'Avr', year: '2026', title: 'Tournée dans les régions du Centre', location: 'Bouaké, Béoumi, Sakassou', type: 'Tournée', description: "Visite des sections locales et rencontre avec les populations des régions du Centre.", capacity: '10 000' },
    { id: 5, day: '20', month: 'Avr', year: '2026', title: 'Rencontre de la diaspora Europe', location: 'Paris, France (en visioconférence)', type: 'Diaspora', description: "Rencontre annuelle avec les sections européennes du PDCI-RDA.", capacity: '1 000' },
    { id: 6, day: '28', month: 'Avr', year: '2026', title: 'Conférence sur la décentralisation', location: 'Abidjan, Hôtel Ivoire', type: 'Conférence', description: "Réflexion sur la décentralisation et le développement local.", capacity: '300' },
  ];

  protected get filteredEvents(): EventItem[] {
    const type = this.filterType();
    return type === 'Tous' ? this.events : this.events.filter(e => e.type === type);
  }

  protected setFilter(type: string): void {
    this.filterType.set(type);
  }

  protected getTypeBadgeColor(type: string): string {
    const colors: Record<string, string> = {
      'Meeting': 'bg-green-100 text-green-800',
      'Conférence': 'bg-blue-100 text-blue-800',
      'Tournée': 'bg-amber-100 text-amber-800',
      'Formation': 'bg-purple-100 text-purple-800',
      'Diaspora': 'bg-cyan-100 text-cyan-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  }
}

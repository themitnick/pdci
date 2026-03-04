import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface DiasporaPays {
  id: number;
  pays: string;
  continent: string;
  drapeau: string;
  militants: number;
  actifs: number;
  cotisationAJour: number;
  representation: string;
  responsable: string;
  derniereActivite: string;
}

@Component({
  selector: 'app-crm-diaspora',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './diaspora.html',
  styleUrl: './diaspora.scss',
})
export class CrmDiaspora {
  protected readonly selectedContinent = signal('');
  protected readonly searchQuery = signal('');

  protected readonly pays: DiasporaPays[] = [
    { id: 1, pays: 'France', continent: 'Europe', drapeau: '🇫🇷', militants: 4200, actifs: 3100, cotisationAJour: 2800, representation: 'Coordination France', responsable: 'Diallo Mamadou', derniereActivite: '2026-03-01' },
    { id: 2, pays: 'États-Unis', continent: 'Amérique', drapeau: '🇺🇸', militants: 1850, actifs: 1200, cotisationAJour: 950, representation: 'Section USA', responsable: 'Koné Fatoumata', derniereActivite: '2026-02-28' },
    { id: 3, pays: 'Canada', continent: 'Amérique', drapeau: '🇨🇦', militants: 980, actifs: 680, cotisationAJour: 520, representation: 'Section Canada', responsable: 'Bamba Sékou Jr', derniereActivite: '2026-02-25' },
    { id: 4, pays: 'Belgique', continent: 'Europe', drapeau: '🇧🇪', militants: 620, actifs: 450, cotisationAJour: 380, representation: 'Section Belgique', responsable: 'N\'Dri Ange', derniereActivite: '2026-03-02' },
    { id: 5, pays: 'Allemagne', continent: 'Europe', drapeau: '🇩🇪', militants: 340, actifs: 220, cotisationAJour: 180, representation: 'Cellule Allemagne', responsable: 'Traoré Aissata', derniereActivite: '2026-02-20' },
    { id: 6, pays: 'Maroc', continent: 'Afrique', drapeau: '🇲🇦', militants: 180, actifs: 120, cotisationAJour: 95, representation: 'Cellule Maroc', responsable: 'Ouattara Drissa', derniereActivite: '2026-01-15' },
    { id: 7, pays: 'Sénégal', continent: 'Afrique', drapeau: '🇸🇳', militants: 420, actifs: 310, cotisationAJour: 260, representation: 'Section Sénégal', responsable: 'Coulibaly Hamed', derniereActivite: '2026-03-01' },
    { id: 8, pays: 'Gabon', continent: 'Afrique', drapeau: '🇬🇦', militants: 280, actifs: 200, cotisationAJour: 170, representation: 'Cellule Gabon', responsable: 'Yao Kouamé', derniereActivite: '2026-02-18' },
    { id: 9, pays: 'Royaume-Uni', continent: 'Europe', drapeau: '🇬🇧', militants: 520, actifs: 380, cotisationAJour: 310, representation: 'Section UK', responsable: 'Diarrassouba Ali', derniereActivite: '2026-02-27' },
    { id: 10, pays: 'Chine', continent: 'Asie', drapeau: '🇨🇳', militants: 85, actifs: 50, cotisationAJour: 35, representation: 'Cellule Chine', responsable: 'Soro Ahmed', derniereActivite: '2026-01-05' },
    { id: 11, pays: 'Italie', continent: 'Europe', drapeau: '🇮🇹', militants: 290, actifs: 190, cotisationAJour: 155, representation: 'Cellule Italie', responsable: 'Konan Berthe', derniereActivite: '2026-02-22' },
    { id: 12, pays: 'Cameroun', continent: 'Afrique', drapeau: '🇨🇲', militants: 150, actifs: 100, cotisationAJour: 80, representation: 'Cellule Cameroun', responsable: 'Touré Ismaël', derniereActivite: '2026-02-10' },
  ];

  protected readonly continents = computed(() =>
    [...new Set(this.pays.map(p => p.continent))].sort()
  );

  protected readonly filteredPays = computed(() => {
    let result = this.pays;
    const continent = this.selectedContinent();
    const query = this.searchQuery().toLowerCase();
    if (continent) result = result.filter(p => p.continent === continent);
    if (query) result = result.filter(p =>
      p.pays.toLowerCase().includes(query) ||
      p.responsable.toLowerCase().includes(query) ||
      p.representation.toLowerCase().includes(query)
    );
    return result.sort((a, b) => b.militants - a.militants);
  });

  protected readonly stats = computed(() => {
    const all = this.pays;
    return {
      totalMilitants: all.reduce((s, p) => s + p.militants, 0),
      totalActifs: all.reduce((s, p) => s + p.actifs, 0),
      totalCotisation: all.reduce((s, p) => s + p.cotisationAJour, 0),
      nbPays: all.length,
    };
  });

  protected readonly continentStats = computed(() => {
    const map = new Map<string, { militants: number; actifs: number; pays: number }>();
    for (const p of this.pays) {
      const cur = map.get(p.continent) || { militants: 0, actifs: 0, pays: 0 };
      cur.militants += p.militants;
      cur.actifs += p.actifs;
      cur.pays++;
      map.set(p.continent, cur);
    }
    return Array.from(map.entries())
      .map(([continent, v]) => ({ continent, ...v }))
      .sort((a, b) => b.militants - a.militants);
  });

  protected onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected onFilter(event: Event): void {
    this.selectedContinent.set((event.target as HTMLSelectElement).value);
  }

  protected getMobilisationLevel(p: DiasporaPays): { label: string; color: string } {
    const rate = p.actifs / p.militants;
    if (rate >= 0.75) return { label: 'Élevée', color: 'text-green-600' };
    if (rate >= 0.5) return { label: 'Moyenne', color: 'text-amber-600' };
    return { label: 'Faible', color: 'text-red-500' };
  }
}

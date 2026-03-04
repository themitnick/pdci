import { Component, signal, computed } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

interface CrmEvent {
  id: number;
  titre: string;
  type: 'reunion' | 'meeting' | 'formation' | 'ceremonie';
  date: string;
  heure: string;
  lieu: string;
  region: string;
  participants: number;
  inscrits: number;
  capacite: number;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  responsable: string;
}

interface RegionStat {
  region: string;
  nbEvents: number;
  totalParticipants: number;
  tauxPresence: number;
}

@Component({
  selector: 'app-crm-evenements',
  standalone: true,
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './evenements.html',
  styleUrl: './evenements.scss',
})
export class CrmEvenements {
  protected readonly selectedType = signal('');
  protected readonly selectedStatut = signal('');
  protected readonly selectedRegion = signal('');
  protected readonly viewMode = signal<'list' | 'grid'>('list');

  protected readonly events: CrmEvent[] = [
    { id: 1, titre: 'Bureau Politique élargi', type: 'reunion', date: '2025-07-15', heure: '10:00', lieu: 'Siège du parti, Cocody', region: 'Abidjan', participants: 85, inscrits: 100, capacite: 120, statut: 'planifie', responsable: 'Kokora Sébastien' },
    { id: 2, titre: 'Meeting populaire — Place CP1', type: 'meeting', date: '2025-07-20', heure: '15:00', lieu: 'Place CP1, Plateau', region: 'Abidjan', participants: 3200, inscrits: 4500, capacite: 5000, statut: 'planifie', responsable: 'Bamba Sékou' },
    { id: 3, titre: 'Formation des jeunes cadres', type: 'formation', date: '2025-07-10', heure: '09:00', lieu: 'Centre PDCI Bouaké', region: 'Bouaké', participants: 45, inscrits: 48, capacite: 50, statut: 'en_cours', responsable: 'Koné Aminata' },
    { id: 4, titre: 'Commémoration du 9 avril', type: 'ceremonie', date: '2025-04-09', heure: '08:00', lieu: 'Yamoussoukro', region: 'Yamoussoukro', participants: 15000, inscrits: 18000, capacite: 20000, statut: 'termine', responsable: 'Kouadio Jean' },
    { id: 5, titre: 'Réunion comité de section Daloa', type: 'reunion', date: '2025-06-28', heure: '14:00', lieu: 'Section PDCI Daloa', region: 'Daloa', participants: 30, inscrits: 35, capacite: 40, statut: 'termine', responsable: 'Diarrassouba Aïcha' },
    { id: 6, titre: 'Grand meeting de San Pedro', type: 'meeting', date: '2025-08-05', heure: '16:00', lieu: 'Stade municipal San Pedro', region: 'San Pedro', participants: 0, inscrits: 2400, capacite: 8000, statut: 'planifie', responsable: 'Touré Mamadou' },
    { id: 7, titre: 'Formation sur la mobilisation digitale', type: 'formation', date: '2025-03-15', heure: '09:00', lieu: 'Siège, Cocody', region: 'Abidjan', participants: 25, inscrits: 30, capacite: 30, statut: 'annule', responsable: 'Traoré Ibrahim' },
    { id: 8, titre: 'Assemblée Générale Korhogo', type: 'reunion', date: '2025-08-20', heure: '10:00', lieu: 'Salle polyvalente, Korhogo', region: 'Korhogo', participants: 0, inscrits: 180, capacite: 250, statut: 'planifie', responsable: 'Ouattara Fatou' },
  ];

  protected readonly filteredEvents = computed(() => {
    let result = this.events;
    const type = this.selectedType();
    const statut = this.selectedStatut();
    const region = this.selectedRegion();
    if (type) result = result.filter(e => e.type === type);
    if (statut) result = result.filter(e => e.statut === statut);
    if (region) result = result.filter(e => e.region === region);
    return result;
  });

  protected readonly stats = computed(() => {
    const all = this.events;
    const termines = all.filter(e => e.statut === 'termine');
    const totalParticipants = termines.reduce((s, e) => s + e.participants, 0);
    const totalInscrits = termines.reduce((s, e) => s + e.inscrits, 0);
    return {
      total: all.length,
      planifies: all.filter(e => e.statut === 'planifie').length,
      termines: termines.length,
      tauxPresence: totalInscrits > 0 ? totalParticipants / totalInscrits : 0,
    };
  });

  protected readonly regionStats = computed<RegionStat[]>(() => {
    const map = new Map<string, { nb: number; p: number; i: number }>();
    for (const e of this.events) {
      const cur = map.get(e.region) || { nb: 0, p: 0, i: 0 };
      cur.nb++;
      cur.p += e.participants;
      cur.i += e.inscrits;
      map.set(e.region, cur);
    }
    return Array.from(map.entries()).map(([region, v]) => ({
      region,
      nbEvents: v.nb,
      totalParticipants: v.p,
      tauxPresence: v.i > 0 ? v.p / v.i : 0,
    })).sort((a, b) => b.nbEvents - a.nbEvents);
  });

  protected readonly regions = computed(() =>
    [...new Set(this.events.map(e => e.region))].sort()
  );

  protected onTypeFilter(event: Event): void {
    this.selectedType.set((event.target as HTMLSelectElement).value);
  }

  protected onStatutFilter(event: Event): void {
    this.selectedStatut.set((event.target as HTMLSelectElement).value);
  }

  protected onRegionFilter(event: Event): void {
    this.selectedRegion.set((event.target as HTMLSelectElement).value);
  }

  protected getTypeBadge(type: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      reunion: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réunion' },
      meeting: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Meeting' },
      formation: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Formation' },
      ceremonie: { bg: 'bg-green-100', text: 'text-green-700', label: 'Cérémonie' },
    };
    return map[type] || { bg: 'bg-gray-100', text: 'text-gray-500', label: type };
  }

  protected getStatutBadge(statut: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      planifie: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Planifié' },
      en_cours: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En cours' },
      termine: { bg: 'bg-green-100', text: 'text-green-700', label: 'Terminé' },
      annule: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulé' },
    };
    return map[statut] || { bg: 'bg-gray-100', text: 'text-gray-500', label: statut };
  }

  protected getParticipationRate(e: CrmEvent): number {
    return e.capacite > 0 ? Math.round((e.participants / e.capacite) * 100) : 0;
  }

  protected getPresenceRate(e: CrmEvent): number {
    return e.inscrits > 0 ? e.participants / e.inscrits : 0;
  }
}

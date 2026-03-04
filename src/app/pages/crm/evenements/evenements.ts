import { Component, signal, computed } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [DecimalPipe, PercentPipe, FormsModule],
  templateUrl: './evenements.html',
  styleUrl: './evenements.scss',
})
export class CrmEvenements {
  protected readonly selectedType = signal('');
  protected readonly selectedStatut = signal('');
  protected readonly selectedRegion = signal('');
  protected readonly viewMode = signal<'list' | 'grid'>('list');
  protected readonly showCreateForm = signal(false);
  protected readonly createSuccess = signal(false);

  protected readonly regionOptions = ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San Pedro', 'Korhogo', 'Man', 'Gagnoa'];

  protected newEvent = {
    titre: '', type: 'reunion' as CrmEvent['type'], date: '', heure: '10:00',
    lieu: '', region: '', capacite: 100, responsable: '',
  };

  // ── Calendar date picker state ──
  protected readonly calendarOpen = signal(false);
  protected readonly calViewYear = signal(new Date().getFullYear());
  protected readonly calViewMonth = signal(new Date().getMonth());
  protected readonly selectedDate = signal<Date | null>(null);
  protected readonly monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  protected readonly dayLabels = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  protected readonly calendarDays = computed(() => {
    const year = this.calViewYear();
    const month = this.calViewMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;
    const days: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
    return days;
  });
  protected readonly calendarYears = computed(() => {
    const current = new Date().getFullYear();
    const years: number[] = [];
    for (let y = current + 5; y >= current - 10; y--) years.push(y);
    return years;
  });

  protected toggleCalendar(): void { this.calendarOpen.update(v => !v); }
  protected calPrevMonth(): void {
    if (this.calViewMonth() === 0) { this.calViewMonth.set(11); this.calViewYear.update(y => y - 1); } else { this.calViewMonth.update(m => m - 1); }
  }
  protected calNextMonth(): void {
    if (this.calViewMonth() === 11) { this.calViewMonth.set(0); this.calViewYear.update(y => y + 1); } else { this.calViewMonth.update(m => m + 1); }
  }
  protected calSelectDay(day: number): void {
    const date = new Date(this.calViewYear(), this.calViewMonth(), day);
    this.selectedDate.set(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    this.newEvent.date = `${yyyy}-${mm}-${dd}`;
    this.calendarOpen.set(false);
  }
  protected calIsSelected(day: number): boolean {
    const sel = this.selectedDate();
    if (!sel) return false;
    return sel.getFullYear() === this.calViewYear() && sel.getMonth() === this.calViewMonth() && sel.getDate() === day;
  }
  protected calIsToday(day: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.calViewYear() && today.getMonth() === this.calViewMonth() && today.getDate() === day;
  }
  protected onCalYearChange(event: Event): void { this.calViewYear.set(+(event.target as HTMLSelectElement).value); }
  protected onCalMonthChange(event: Event): void { this.calViewMonth.set(+(event.target as HTMLSelectElement).value); }
  protected get formattedEventDate(): string {
    const sel = this.selectedDate();
    if (!sel) return '';
    return `${String(sel.getDate()).padStart(2, '0')}/${String(sel.getMonth() + 1).padStart(2, '0')}/${sel.getFullYear()}`;
  }

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

  protected openCreateForm(): void {
    this.newEvent = { titre: '', type: 'reunion', date: '', heure: '10:00', lieu: '', region: '', capacite: 100, responsable: '' };
    this.selectedDate.set(null);
    this.calendarOpen.set(false);
    this.createSuccess.set(false);
    this.showCreateForm.set(true);
  }

  protected closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  protected submitCreateForm(): void {
    if (!this.newEvent.titre || !this.newEvent.date || !this.newEvent.region || !this.newEvent.lieu) return;
    const newId = Math.max(...this.events.map(e => e.id)) + 1;
    this.events.push({
      id: newId,
      titre: this.newEvent.titre,
      type: this.newEvent.type,
      date: this.newEvent.date,
      heure: this.newEvent.heure,
      lieu: this.newEvent.lieu,
      region: this.newEvent.region,
      participants: 0,
      inscrits: 0,
      capacite: this.newEvent.capacite || 100,
      statut: 'planifie',
      responsable: this.newEvent.responsable || 'Non assigné',
    });
    this.createSuccess.set(true);
    setTimeout(() => this.showCreateForm.set(false), 1500);
  }
}

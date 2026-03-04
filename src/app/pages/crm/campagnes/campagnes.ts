import { Component, signal, computed } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Campagne {
  id: number;
  nom: string;
  type: 'sms' | 'notification' | 'email';
  statut: 'brouillon' | 'planifiee' | 'en_cours' | 'terminee';
  dateCreation: string;
  dateEnvoi: string;
  segment: string;
  destinataires: number;
  envoyes: number;
  lus: number;
  reponses: number;
  description: string;
}

@Component({
  selector: 'app-crm-campagnes',
  standalone: true,
  imports: [DecimalPipe, PercentPipe, FormsModule],
  templateUrl: './campagnes.html',
  styleUrl: './campagnes.scss',
})
export class CrmCampagnes {
  protected readonly selectedTab = signal<'liste' | 'creation'>('liste');
  protected readonly filterType = signal('');
  protected readonly filterStatut = signal('');
  protected readonly showCreateForm = signal(false);
  protected readonly createSuccess = signal(false);

  protected readonly segmentOptions = [
    'Tous les militants actifs', 'Cotisation en retard', '18-30 ans, non-membres',
    'Militants Abidjan', 'Coordinateurs locaux', 'Diaspora Europe', 'Tous les militants'
  ];

  protected newCampagne = {
    nom: '', type: 'sms' as Campagne['type'], segment: '', description: '', dateEnvoi: '',
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
    for (let y = current + 5; y >= current - 5; y--) years.push(y);
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
    this.newCampagne.dateEnvoi = `${yyyy}-${mm}-${dd}`;
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
  protected get formattedCampagneDate(): string {
    const sel = this.selectedDate();
    if (!sel) return '';
    return `${String(sel.getDate()).padStart(2, '0')}/${String(sel.getMonth() + 1).padStart(2, '0')}/${sel.getFullYear()}`;
  }

  protected readonly campagnes: Campagne[] = [
    { id: 1, nom: 'Mobilisation Congrès Yamoussoukro', type: 'sms', statut: 'terminee', dateCreation: '2026-01-15', dateEnvoi: '2026-02-01', segment: 'Tous les militants actifs', destinataires: 15340, envoyes: 15120, lus: 12890, reponses: 3420, description: 'Appel à mobilisation pour le congrès national du parti à Yamoussoukro.' },
    { id: 2, nom: 'Rappel Cotisation T1 2026', type: 'sms', statut: 'terminee', dateCreation: '2026-01-05', dateEnvoi: '2026-01-10', segment: 'Cotisation en retard', destinataires: 4200, envoyes: 4180, lus: 3650, reponses: 980, description: 'Rappel de paiement des cotisations pour le premier trimestre 2026.' },
    { id: 3, nom: 'Campagne Adhésion Jeunes', type: 'notification', statut: 'en_cours', dateCreation: '2026-02-20', dateEnvoi: '2026-03-01', segment: '18-30 ans, non-membres', destinataires: 8500, envoyes: 6200, lus: 4100, reponses: 1250, description: 'Campagne ciblant les jeunes pour encourager les nouvelles adhésions.' },
    { id: 4, nom: 'Invitation Meeting Abidjan', type: 'sms', statut: 'planifiee', dateCreation: '2026-03-01', dateEnvoi: '2026-03-15', segment: 'Militants Abidjan', destinataires: 5600, envoyes: 0, lus: 0, reponses: 0, description: 'Invitation au grand meeting politique prévu à Abidjan.' },
    { id: 5, nom: 'Newsletter Mars 2026', type: 'email', statut: 'planifiee', dateCreation: '2026-03-02', dateEnvoi: '2026-03-10', segment: 'Tous les militants', destinataires: 18000, envoyes: 0, lus: 0, reponses: 0, description: 'Newsletter mensuelle avec les actualités du parti.' },
    { id: 6, nom: 'Alerte sécurité bureau', type: 'notification', statut: 'brouillon', dateCreation: '2026-03-03', dateEnvoi: '', segment: 'Coordinateurs locaux', destinataires: 48, envoyes: 0, lus: 0, reponses: 0, description: 'Communication sur les nouvelles consignes de sécurité des bureaux.' },
    { id: 7, nom: 'Mobilisation Diaspora Europe', type: 'sms', statut: 'terminee', dateCreation: '2025-12-01', dateEnvoi: '2025-12-15', segment: 'Diaspora Europe', destinataires: 2300, envoyes: 2280, lus: 1950, reponses: 680, description: 'Mobilisation de la diaspora européenne pour les activités de fin d\'année.' },
  ];

  protected readonly filteredCampagnes = computed(() => {
    let result = this.campagnes;
    const type = this.filterType();
    const statut = this.filterStatut();
    if (type) result = result.filter(c => c.type === type);
    if (statut) result = result.filter(c => c.statut === statut);
    return result;
  });

  protected readonly stats = computed(() => {
    const all = this.campagnes;
    const terminees = all.filter(c => c.statut === 'terminee');
    const totalEnvoyes = terminees.reduce((s, c) => s + c.envoyes, 0);
    const totalLus = terminees.reduce((s, c) => s + c.lus, 0);
    return {
      total: all.length,
      enCours: all.filter(c => c.statut === 'en_cours').length,
      planifiees: all.filter(c => c.statut === 'planifiee').length,
      tauxLecture: totalEnvoyes > 0 ? totalLus / totalEnvoyes : 0,
    };
  });

  protected onFilter(type: 'type' | 'statut', event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    if (type === 'type') this.filterType.set(val);
    else this.filterStatut.set(val);
  }

  protected getTypeBadge(type: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      sms: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'SMS' },
      notification: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Notification' },
      email: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Email' },
    };
    return map[type] || { bg: 'bg-gray-100', text: 'text-gray-500', label: type };
  }

  protected getStatutBadge(statut: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      brouillon: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Brouillon' },
      planifiee: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Planifiée' },
      en_cours: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En cours' },
      terminee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Terminée' },
    };
    return map[statut] || { bg: 'bg-gray-100', text: 'text-gray-500', label: statut };
  }

  protected getEngagementRate(c: Campagne): number {
    return c.envoyes > 0 ? c.lus / c.envoyes : 0;
  }

  protected openCreateForm(): void {
    this.newCampagne = { nom: '', type: 'sms', segment: '', description: '', dateEnvoi: '' };
    this.selectedDate.set(null);
    this.calendarOpen.set(false);
    this.createSuccess.set(false);
    this.showCreateForm.set(true);
  }

  protected closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  protected submitCreateForm(): void {
    if (!this.newCampagne.nom || !this.newCampagne.segment || !this.newCampagne.description) return;
    const today = new Date().toISOString().split('T')[0];
    const newId = Math.max(...this.campagnes.map(c => c.id)) + 1;
    this.campagnes.push({
      id: newId,
      nom: this.newCampagne.nom,
      type: this.newCampagne.type,
      statut: this.newCampagne.dateEnvoi ? 'planifiee' : 'brouillon',
      dateCreation: today,
      dateEnvoi: this.newCampagne.dateEnvoi || '',
      segment: this.newCampagne.segment,
      destinataires: 0,
      envoyes: 0,
      lus: 0,
      reponses: 0,
      description: this.newCampagne.description,
    });
    this.createSuccess.set(true);
    setTimeout(() => this.showCreateForm.set(false), 1500);
  }
}

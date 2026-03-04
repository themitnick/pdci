import { Component, signal, computed } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

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
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './campagnes.html',
  styleUrl: './campagnes.scss',
})
export class CrmCampagnes {
  protected readonly selectedTab = signal<'liste' | 'creation'>('liste');
  protected readonly filterType = signal('');
  protected readonly filterStatut = signal('');

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
}

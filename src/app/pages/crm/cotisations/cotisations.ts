import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Cotisation {
  id: number;
  militant: string;
  region: string;
  montant: number;
  periode: string;
  datePaiement: string | null;
  statut: 'paye' | 'en_retard' | 'non_paye';
  modePaiement: string;
}

@Component({
  selector: 'app-crm-cotisations',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cotisations.html',
  styleUrl: './cotisations.scss',
})
export class CrmCotisations {
  protected readonly selectedStatut = signal('');
  protected readonly selectedPeriode = signal('');
  protected readonly currentPage = signal(1);
  protected readonly itemsPerPage = 10;

  protected readonly periodes = ['Janvier 2025', 'Février 2025', 'Mars 2025', 'Avril 2025', 'Mai 2025', 'Juin 2025'];

  protected readonly stats = [
    { label: 'Total collecté', value: '12 450 000', suffix: 'FCFA', icon: 'banknotes', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'En attente', value: '3 200 000', suffix: 'FCFA', icon: 'clock', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Taux de recouvrement', value: '78', suffix: '%', icon: 'chart', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Cotisations en retard', value: '342', suffix: '', icon: 'alert', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  protected readonly cotisations: Cotisation[] = [
    { id: 1, militant: 'Koné Aminata', region: 'Bouaké', montant: 5000, periode: 'Juin 2025', datePaiement: '2025-06-03', statut: 'paye', modePaiement: 'Mobile Money' },
    { id: 2, militant: 'Traoré Ibrahim', region: 'Abidjan', montant: 5000, periode: 'Juin 2025', datePaiement: '2025-06-01', statut: 'paye', modePaiement: 'Mobile Money' },
    { id: 3, militant: 'Diarra Moussa', region: 'Abidjan', montant: 5000, periode: 'Juin 2025', datePaiement: null, statut: 'non_paye', modePaiement: '-' },
    { id: 4, militant: 'Bamba Sékou', region: 'Daloa', montant: 5000, periode: 'Mai 2025', datePaiement: null, statut: 'en_retard', modePaiement: '-' },
    { id: 5, militant: 'Yao Ange', region: 'San Pedro', montant: 5000, periode: 'Juin 2025', datePaiement: null, statut: 'non_paye', modePaiement: '-' },
    { id: 6, militant: 'Kouadio Jean', region: 'Yamoussoukro', montant: 5000, periode: 'Juin 2025', datePaiement: '2025-06-05', statut: 'paye', modePaiement: 'Virement' },
    { id: 7, militant: 'Ouattara Fatou', region: 'Korhogo', montant: 5000, periode: 'Mai 2025', datePaiement: null, statut: 'en_retard', modePaiement: '-' },
    { id: 8, militant: 'Coulibaly Adama', region: 'Abidjan', montant: 5000, periode: 'Juin 2025', datePaiement: '2025-06-02', statut: 'paye', modePaiement: 'Mobile Money' },
    { id: 9, militant: 'N\'Guessan Marie', region: 'Abidjan', montant: 5000, periode: 'Avril 2025', datePaiement: null, statut: 'en_retard', modePaiement: '-' },
    { id: 10, militant: 'Soro Lacina', region: 'Bouaké', montant: 5000, periode: 'Juin 2025', datePaiement: '2025-06-07', statut: 'paye', modePaiement: 'Espèces' },
    { id: 11, militant: 'Diarrassouba Aïcha', region: 'Daloa', montant: 5000, periode: 'Juin 2025', datePaiement: '2025-06-04', statut: 'paye', modePaiement: 'Mobile Money' },
    { id: 12, militant: 'Touré Mamadou', region: 'San Pedro', montant: 5000, periode: 'Mai 2025', datePaiement: null, statut: 'en_retard', modePaiement: '-' },
  ];

  protected readonly filteredCotisations = computed(() => {
    let result = this.cotisations;
    const statut = this.selectedStatut();
    const periode = this.selectedPeriode();
    if (statut) result = result.filter(c => c.statut === statut);
    if (periode) result = result.filter(c => c.periode === periode);
    return result;
  });

  protected readonly paginatedCotisations = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredCotisations().slice(start, start + this.itemsPerPage);
  });

  protected readonly totalPages = computed(() =>
    Math.ceil(this.filteredCotisations().length / this.itemsPerPage)
  );

  protected onStatutFilter(event: Event): void {
    this.selectedStatut.set((event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  protected onPeriodeFilter(event: Event): void {
    this.selectedPeriode.set((event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  protected getStatutBadge(statut: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      paye: { bg: 'bg-green-100', text: 'text-green-700', label: 'Payé' },
      en_retard: { bg: 'bg-red-100', text: 'text-red-700', label: 'En retard' },
      non_paye: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Non payé' },
    };
    return map[statut] || { bg: 'bg-gray-100', text: 'text-gray-500', label: statut };
  }

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }
}

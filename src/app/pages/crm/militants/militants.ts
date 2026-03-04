import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Militant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  dateNaissance: string;
  age: number;
  genre: 'H' | 'F';
  region: string;
  section: string;
  localite: string;
  dateAdhesion: string;
  statut: 'actif' | 'en_attente' | 'suspendu' | 'inactif';
  role: string;
  cotisationAJour: boolean;
  derniereActivite: string;
  nbCotisations: number;
  nbEvenements: number;
}

@Component({
  selector: 'app-crm-militants',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './militants.html',
  styleUrl: './militants.scss',
})
export class CrmMilitants {
  protected readonly searchQuery = signal('');
  protected readonly selectedStatut = signal('');
  protected readonly selectedRegion = signal('');
  protected readonly selectedAge = signal('');
  protected readonly currentPage = signal(1);
  protected readonly itemsPerPage = 10;
  protected readonly selectedMilitant = signal<Militant | null>(null);
  protected readonly showDetail = signal(false);
  protected readonly showCreateForm = signal(false);
  protected readonly createSuccess = signal(false);

  // Create form model
  protected newMilitant = {
    nom: '', prenom: '', email: '', phone: '', dateNaissance: '',
    genre: 'H' as 'H' | 'F', region: '', section: '', localite: '',
    role: 'Militant', statut: 'en_attente' as const,
  };

  protected readonly roleOptions = ['Militant', 'Agent Terrain', 'Responsable Section', 'Coordinateur Local', 'Responsable Régional'];

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
    for (let y = current; y >= current - 100; y--) years.push(y);
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
    this.newMilitant.dateNaissance = `${yyyy}-${mm}-${dd}`;
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
  protected calIsFuture(day: number): boolean {
    return new Date(this.calViewYear(), this.calViewMonth(), day) > new Date();
  }
  protected onCalYearChange(event: Event): void { this.calViewYear.set(+(event.target as HTMLSelectElement).value); }
  protected onCalMonthChange(event: Event): void { this.calViewMonth.set(+(event.target as HTMLSelectElement).value); }
  protected get formattedDate(): string {
    const sel = this.selectedDate();
    if (!sel) return '';
    return `${String(sel.getDate()).padStart(2, '0')}/${String(sel.getMonth() + 1).padStart(2, '0')}/${sel.getFullYear()}`;
  }

  protected readonly regions = ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San Pedro', 'Korhogo', 'Man', 'Gagnoa'];
  protected readonly ageRanges = [
    { label: '18-25 ans', min: 18, max: 25 },
    { label: '26-35 ans', min: 26, max: 35 },
    { label: '36-45 ans', min: 36, max: 45 },
    { label: '46-55 ans', min: 46, max: 55 },
    { label: '56+ ans', min: 56, max: 120 },
  ];

  protected readonly militants: Militant[] = [
    { id: 1, nom: 'Koné', prenom: 'Aminata', email: 'aminata.kone@mail.ci', phone: '+225 07 12 34 56', dateNaissance: '1990-05-12', age: 35, genre: 'F', region: 'Bouaké', section: 'Bouaké-Centre', localite: 'Quartier Commerce', dateAdhesion: '2024-03-15', statut: 'actif', role: 'Responsable Section', cotisationAJour: true, derniereActivite: '2026-03-01', nbCotisations: 24, nbEvenements: 12 },
    { id: 2, nom: 'Traoré', prenom: 'Ibrahim', email: 'ibrahim.traore@mail.ci', phone: '+225 05 98 76 54', dateNaissance: '1985-11-22', age: 40, genre: 'H', region: 'Abidjan', section: 'Cocody', localite: 'Riviera 2', dateAdhesion: '2024-01-22', statut: 'actif', role: 'Coordinateur Local', cotisationAJour: true, derniereActivite: '2026-03-02', nbCotisations: 26, nbEvenements: 18 },
    { id: 3, nom: 'Diarra', prenom: 'Moussa', email: 'moussa.diarra@mail.fr', phone: '+225 07 55 44 33', dateNaissance: '1998-08-10', age: 27, genre: 'H', region: 'Abidjan', section: 'Plateau', localite: 'Plateau Centre', dateAdhesion: '2025-11-10', statut: 'en_attente', role: 'Militant', cotisationAJour: false, derniereActivite: '2025-11-10', nbCotisations: 0, nbEvenements: 0 },
    { id: 4, nom: 'Bamba', prenom: 'Sékou', email: 'sekou.bamba@mail.ci', phone: '+225 01 22 33 44', dateNaissance: '1975-03-05', age: 50, genre: 'H', region: 'Daloa', section: 'Daloa-Nord', localite: 'Quartier Lobia', dateAdhesion: '2023-06-05', statut: 'actif', role: 'Responsable Régional', cotisationAJour: false, derniereActivite: '2026-02-28', nbCotisations: 30, nbEvenements: 22 },
    { id: 5, nom: 'Yao', prenom: 'Ange', email: 'ange.yao@mail.ci', phone: '+225 07 66 77 88', dateNaissance: '2002-12-01', age: 23, genre: 'F', region: 'San Pedro', section: 'San Pedro-Port', localite: 'Zone portuaire', dateAdhesion: '2025-12-01', statut: 'en_attente', role: 'Militant', cotisationAJour: false, derniereActivite: '2025-12-01', nbCotisations: 0, nbEvenements: 0 },
    { id: 6, nom: 'Kouadio', prenom: 'Jean', email: 'jean.kouadio@mail.ci', phone: '+225 05 11 22 33', dateNaissance: '1968-09-18', age: 57, genre: 'H', region: 'Yamoussoukro', section: 'Yamoussoukro-Centre', localite: 'Quartier Habitat', dateAdhesion: '2022-09-18', statut: 'actif', role: 'Agent Terrain', cotisationAJour: true, derniereActivite: '2026-03-01', nbCotisations: 42, nbEvenements: 35 },
    { id: 7, nom: 'Ouattara', prenom: 'Fatou', email: 'fatou.ouattara@mail.ci', phone: '+225 07 99 88 77', dateNaissance: '1992-07-24', age: 33, genre: 'F', region: 'Korhogo', section: 'Korhogo-Ville', localite: 'Centre-ville', dateAdhesion: '2024-07-24', statut: 'suspendu', role: 'Militant', cotisationAJour: false, derniereActivite: '2025-06-15', nbCotisations: 8, nbEvenements: 3 },
    { id: 8, nom: 'Coulibaly', prenom: 'Adama', email: 'adama.coulibaly@mail.ci', phone: '+225 01 44 55 66', dateNaissance: '1995-05-30', age: 30, genre: 'H', region: 'Abidjan', section: 'Abobo', localite: 'Abobo-Gare', dateAdhesion: '2024-05-30', statut: 'actif', role: 'Militant', cotisationAJour: true, derniereActivite: '2026-02-25', nbCotisations: 18, nbEvenements: 8 },
    { id: 9, nom: 'N\'Guessan', prenom: 'Marie', email: 'marie.nguessan@mail.ci', phone: '+225 07 33 22 11', dateNaissance: '1988-02-14', age: 38, genre: 'F', region: 'Abidjan', section: 'Marcory', localite: 'Zone 4', dateAdhesion: '2025-02-14', statut: 'inactif', role: 'Militant', cotisationAJour: false, derniereActivite: '2025-05-20', nbCotisations: 3, nbEvenements: 1 },
    { id: 10, nom: 'Soro', prenom: 'Lacina', email: 'lacina.soro@mail.ci', phone: '+225 05 77 66 55', dateNaissance: '1980-11-08', age: 45, genre: 'H', region: 'Bouaké', section: 'Bouaké-Sud', localite: 'Koko', dateAdhesion: '2023-11-08', statut: 'actif', role: 'Agent Terrain', cotisationAJour: true, derniereActivite: '2026-03-03', nbCotisations: 28, nbEvenements: 20 },
    { id: 11, nom: 'Diarrassouba', prenom: 'Aïcha', email: 'aicha.diarrassouba@mail.ci', phone: '+225 07 88 99 00', dateNaissance: '1993-08-20', age: 32, genre: 'F', region: 'Daloa', section: 'Daloa-Centre', localite: 'Gbokora', dateAdhesion: '2024-08-20', statut: 'actif', role: 'Responsable Section', cotisationAJour: true, derniereActivite: '2026-03-02', nbCotisations: 16, nbEvenements: 14 },
    { id: 12, nom: 'Touré', prenom: 'Mamadou', email: 'mamadou.toure@mail.ci', phone: '+225 01 55 66 77', dateNaissance: '2000-01-05', age: 26, genre: 'H', region: 'San Pedro', section: 'San Pedro-Centre', localite: 'Balmer', dateAdhesion: '2025-01-05', statut: 'en_attente', role: 'Militant', cotisationAJour: false, derniereActivite: '2025-01-05', nbCotisations: 0, nbEvenements: 0 },
  ];

  protected readonly filteredMilitants = computed(() => {
    let result = this.militants;
    const query = this.searchQuery().toLowerCase();
    const statut = this.selectedStatut();
    const region = this.selectedRegion();
    const ageRange = this.selectedAge();

    if (query) {
      result = result.filter(m =>
        m.nom.toLowerCase().includes(query) ||
        m.prenom.toLowerCase().includes(query) ||
        m.section.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.phone.includes(query)
      );
    }
    if (statut) result = result.filter(m => m.statut === statut);
    if (region) result = result.filter(m => m.region === region);
    if (ageRange) {
      const range = this.ageRanges.find(r => r.label === ageRange);
      if (range) result = result.filter(m => m.age >= range.min && m.age <= range.max);
    }
    return result;
  });

  protected readonly stats = computed(() => {
    const all = this.militants;
    return {
      total: all.length,
      actifs: all.filter(m => m.statut === 'actif').length,
      enAttente: all.filter(m => m.statut === 'en_attente').length,
      cotisationOk: all.filter(m => m.cotisationAJour).length,
    };
  });

  protected readonly paginatedMilitants = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredMilitants().slice(start, start + this.itemsPerPage);
  });

  protected readonly totalPages = computed(() =>
    Math.ceil(this.filteredMilitants().length / this.itemsPerPage)
  );

  protected onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  protected onFilter(type: 'statut' | 'region' | 'age', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (type === 'statut') this.selectedStatut.set(value);
    else if (type === 'region') this.selectedRegion.set(value);
    else this.selectedAge.set(value);
    this.currentPage.set(1);
  }

  protected openDetail(m: Militant): void {
    this.selectedMilitant.set(m);
    this.showDetail.set(true);
  }

  protected closeDetail(): void {
    this.showDetail.set(false);
  }

  protected getStatutBadge(statut: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      actif: { bg: 'bg-green-100', text: 'text-green-700', label: 'Actif' },
      en_attente: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
      suspendu: { bg: 'bg-red-100', text: 'text-red-700', label: 'Suspendu' },
      inactif: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Inactif' },
    };
    return map[statut] || { bg: 'bg-gray-100', text: 'text-gray-500', label: statut };
  }

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  protected openCreateForm(): void {
    this.newMilitant = {
      nom: '', prenom: '', email: '', phone: '', dateNaissance: '',
      genre: 'H', region: '', section: '', localite: '',
      role: 'Militant', statut: 'en_attente',
    };
    this.selectedDate.set(null);
    this.calendarOpen.set(false);
    this.createSuccess.set(false);
    this.showCreateForm.set(true);
  }

  protected closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  protected submitCreateForm(): void {
    if (!this.newMilitant.nom || !this.newMilitant.prenom || !this.newMilitant.email || !this.newMilitant.region) return;
    const today = new Date().toISOString().split('T')[0];
    const birthYear = this.newMilitant.dateNaissance ? new Date(this.newMilitant.dateNaissance).getFullYear() : 2000;
    const age = new Date().getFullYear() - birthYear;
    const newId = Math.max(...this.militants.map(m => m.id)) + 1;
    this.militants.push({
      id: newId,
      nom: this.newMilitant.nom,
      prenom: this.newMilitant.prenom,
      email: this.newMilitant.email,
      phone: this.newMilitant.phone || '+225 00 00 00 00',
      dateNaissance: this.newMilitant.dateNaissance || '2000-01-01',
      age,
      genre: this.newMilitant.genre,
      region: this.newMilitant.region,
      section: this.newMilitant.section || this.newMilitant.region + '-Centre',
      localite: this.newMilitant.localite || 'Non renseigné',
      dateAdhesion: today,
      statut: 'en_attente',
      role: this.newMilitant.role,
      cotisationAJour: false,
      derniereActivite: today,
      nbCotisations: 0,
      nbEvenements: 0,
    });
    this.createSuccess.set(true);
    setTimeout(() => this.showCreateForm.set(false), 1500);
  }
}

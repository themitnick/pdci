import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
}

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './actualites.html',
  styleUrl: './actualites.scss',
})
export class Actualites {
  protected readonly categories = ['Tous', 'Communiqués', 'Conférences', 'Déclarations', 'Vie du parti', 'International'];
  protected readonly activeCategory = signal('Tous');
  protected readonly searchQuery = signal('');

  protected readonly articles: Article[] = [
    { id: 1, category: 'Communiqués', title: "Déclaration du Bureau Politique sur la situation nationale", excerpt: "Le Bureau Politique du PDCI-RDA, réuni en session extraordinaire, a examiné la situation politique...", date: '28 Fév 2026', image: 'https://picsum.photos/seed/a1/600/400', readTime: '5 min' },
    { id: 2, category: 'Vie du parti', title: "Tournée du Président dans les régions du Nord", excerpt: "Dans le cadre du renforcement des structures locales, une grande tournée a été organisée...", date: '25 Fév 2026', image: 'https://picsum.photos/seed/a2/600/400', readTime: '3 min' },
    { id: 3, category: 'International', title: "Sommet des partis démocratiques africains à Dakar", excerpt: "Une délégation du PDCI-RDA a participé activement au sommet panafricain des partis démocratiques...", date: '20 Fév 2026', image: 'https://picsum.photos/seed/a3/600/400', readTime: '4 min' },
    { id: 4, category: 'Conférences', title: "Conférence de presse du Secrétaire Général", excerpt: "Le Secrétaire Général a présenté la feuille de route du parti pour le premier semestre 2026...", date: '18 Fév 2026', image: 'https://picsum.photos/seed/a4/600/400', readTime: '6 min' },
    { id: 5, category: 'Déclarations', title: "Position du PDCI-RDA sur la réforme électorale", excerpt: "Le parti se prononce sur les propositions de réforme du cadre électoral ivoirien...", date: '15 Fév 2026', image: 'https://picsum.photos/seed/a5/600/400', readTime: '7 min' },
    { id: 6, category: 'Vie du parti', title: "Inauguration du nouveau siège régional de San Pedro", excerpt: "Le PDCI-RDA a inauguré son nouveau siège régional à San Pedro, marquant l'expansion territoriale...", date: '12 Fév 2026', image: 'https://picsum.photos/seed/a6/600/400', readTime: '3 min' },
  ];

  protected get filteredArticles(): Article[] {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase();
    return this.articles.filter(a => {
      const matchCategory = cat === 'Tous' || a.category === cat;
      const matchSearch = !query || a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }

  protected setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  protected onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}

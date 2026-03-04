import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly stats = [
    { value: '5M+', label: 'Militants' },
    { value: '31', label: 'Régions couvertes' },
    { value: '25+', label: 'Pays (Diaspora)' },
    { value: '1946', label: 'Année de fondation' },
  ];

  protected readonly pillars = [
    {
      num: '01',
      title: 'Démocratie & État de droit',
      description: 'Renforcer les institutions républicaines, garantir les libertés fondamentales et promouvoir une gouvernance transparente.',
      iconPath: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
      bg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      num: '02',
      title: 'Développement économique',
      description: "Créer les conditions d'une croissance inclusive, soutenir l'entrepreneuriat et industrialiser nos régions.",
      iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      num: '03',
      title: 'Éducation & Jeunesse',
      description: "Investir massivement dans l'éducation, la formation professionnelle et offrir des perspectives d'avenir à la jeunesse.",
      iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      num: '04',
      title: 'Unité & Réconciliation',
      description: 'Consolider la cohésion nationale, promouvoir le vivre-ensemble et rassembler tous les Ivoiriens autour d\'un destin commun.',
      iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  protected readonly reasons = [
    {
      num: '1',
      title: 'Le plus grand parti de Côte d\'Ivoire',
      description: 'Avec plus de 5 millions de militants, le PDCI-RDA est la première force politique du pays, présente dans les 31 régions et 25 pays de la diaspora.',
    },
    {
      num: '2',
      title: 'Un héritage historique',
      description: 'Fondé en 1946 par Félix Houphouët-Boigny, le PDCI-RDA est le pilier de la construction nationale et le socle de la démocratie ivoirienne.',
    },
    {
      num: '3',
      title: 'Un projet d\'avenir concret',
      description: 'Un programme politique ambitieux axé sur le développement économique, la justice sociale et la modernisation de l\'État pour les générations futures.',
    },
  ];

  protected readonly latestNews = [
    {
      id: 1,
      category: 'Communiqué',
      title: 'Déclaration du Bureau Politique sur la situation nationale',
      excerpt: 'Le Bureau Politique du PDCI-RDA, réuni en session extraordinaire, a examiné la situation politique et sociale du pays et réaffirme son engagement pour la paix.',
      date: '28 Fév 2026',
      image: 'https://picsum.photos/seed/pdci-news1/800/500',
    },
    {
      id: 2,
      category: 'Vie du Parti',
      title: 'Tournée nationale du Président dans les régions du Nord',
      excerpt: 'Dans le cadre du renforcement des structures locales, le Président du parti a entamé une tournée dans les régions septentrionales...',
      date: '25 Fév 2026',
      image: 'https://picsum.photos/seed/pdci-news2/600/400',
    },
    {
      id: 3,
      category: 'International',
      title: 'Le PDCI-RDA renforce ses liens avec les partis frères africains',
      excerpt: 'Une délégation du parti a participé au sommet des partis démocratiques africains tenu à Dakar...',
      date: '20 Fév 2026',
      image: 'https://picsum.photos/seed/pdci-news3/600/400',
    },
    {
      id: 4,
      category: 'Jeunesse',
      title: 'Lancement du programme « Avenir Jeunes » dans 15 villes',
      excerpt: 'Le PDCI-RDA lance un vaste programme de formation et d\'insertion professionnelle destiné aux jeunes de 18 à 35 ans.',
      date: '18 Fév 2026',
      image: 'https://picsum.photos/seed/pdci-news4/600/400',
    },
  ];

  protected readonly upcomingEvents = [
    {
      id: 1,
      day: '15',
      month: 'Mars',
      title: 'Grand Meeting de mobilisation — Abidjan',
      location: 'Stade Félix Houphouët-Boigny',
      type: 'Meeting',
    },
    {
      id: 2,
      day: '22',
      month: 'Mars',
      title: 'Conférence de presse du Secrétaire Général',
      location: 'Siège du PDCI-RDA, Cocody',
      type: 'Conférence',
    },
    {
      id: 3,
      day: '05',
      month: 'Avr',
      title: 'Séminaire de formation des cadres régionaux',
      location: 'Yamoussoukro',
      type: 'Formation',
    },
  ];

  protected readonly testimonials = [
    {
      name: 'Aminata Koné',
      role: 'Militante, Section Bouaké Centre',
      initials: 'AK',
      bg: 'bg-primary',
      quote: 'Le PDCI-RDA m\'a permis de m\'engager concrètement pour ma communauté. Les formations et l\'accompagnement que j\'ai reçus m\'ont rendue plus compétente et plus engagée.',
    },
    {
      name: 'Moussa Diarra',
      role: 'Responsable Diaspora, Paris',
      initials: 'MD',
      bg: 'bg-blue-600',
      quote: 'Même à des milliers de kilomètres, je reste connecté à mon pays grâce au PDCI-RDA. La section diaspora nous permet de contribuer activement au développement de la Côte d\'Ivoire.',
    },
    {
      name: 'Dr. Claudine Brou',
      role: 'Cadre du parti, Yamoussoukro',
      initials: 'CB',
      bg: 'bg-purple-600',
      quote: 'Le PDCI-RDA est un parti qui croit en la compétence et donne sa chance aux femmes. Mon parcours dans les instances du parti en est la preuve vivante.',
    },
  ];

  protected readonly diasporaStats = [
    { value: '25+', label: 'Pays de présence' },
    { value: '48', label: 'Sections actives' },
    { value: '12 000+', label: 'Membres diaspora' },
  ];

  protected readonly diasporaCities = [
    { name: 'Paris', top: 20, left: 45, delay: '0ms' },
    { name: 'New York', top: 25, left: 20, delay: '300ms' },
    { name: 'Londres', top: 18, left: 42, delay: '600ms' },
    { name: 'Bruxelles', top: 22, left: 48, delay: '200ms' },
    { name: 'Montréal', top: 18, left: 22, delay: '800ms' },
    { name: 'Dakar', top: 42, left: 38, delay: '100ms' },
    { name: 'Rabat', top: 30, left: 42, delay: '500ms' },
    { name: 'Dubaï', top: 35, left: 65, delay: '700ms' },
    { name: 'Pékin', top: 30, left: 78, delay: '400ms' },
    { name: 'Johannesburg', top: 72, left: 55, delay: '900ms' },
    { name: 'São Paulo', top: 65, left: 28, delay: '150ms' },
    { name: 'Berlin', top: 20, left: 50, delay: '450ms' },
  ];
}

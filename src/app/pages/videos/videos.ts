import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  date: string;
  category: string;
  speaker: string;
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  protected readonly activeFilter = signal<string>('all');
  protected readonly playingVideo = signal<string | null>(null);
  private readonly embedUrlCache = new Map<string, SafeResourceUrl>();

  constructor(private readonly sanitizer: DomSanitizer) {}

  protected readonly categories = [
    { key: 'all', label: 'Tout' },
    { key: 'passage-tv', label: 'Passage TV' },
    { key: 'discours', label: 'Discours' },
    { key: 'interview', label: 'Interview' },
    { key: 'evenement', label: 'Événement' },
  ];

  protected readonly videos: Video[] = [
    {
      id: '1',
      youtubeId: 'TrOjPOrFBcM',
      title: 'Le PDCI-RDA face aux défis de la Côte d\'Ivoire moderne',
      date: '28.02.2026',
      category: 'passage-tv',
      speaker: 'Tidjane Thiam',
    },
    {
      id: '2',
      youtubeId: 'TxXVeIdZPeE',
      title: 'Conférence de presse du Président du PDCI-RDA',
      date: '25.02.2026',
      category: 'interview',
      speaker: 'Tidjane Thiam',
    },
    {
      id: '3',
      youtubeId: 'Z9aC9VbTzt0',
      title: 'Assises nationales de la jeunesse du PDCI-RDA',
      date: '19.02.2026',
      category: 'evenement',
      speaker: 'PDCI-RDA',
    },
    {
      id: '4',
      youtubeId: 'Bv_he1oS5-0',
      title: 'Discours du Président Tidjane Thiam aux militants',
      date: '14.02.2026',
      category: 'discours',
      speaker: 'Tidjane Thiam',
    },
    {
      id: '5',
      youtubeId: 'IFPp1qUXP-Q',
      title: 'Le PDCI-RDA et la réconciliation nationale',
      date: '10.02.2026',
      category: 'passage-tv',
      speaker: 'PDCI-RDA',
    },
    {
      id: '6',
      youtubeId: 'vbFTlIsTr2E',
      title: 'Interview exclusive : la vision économique du PDCI-RDA',
      date: '05.02.2026',
      category: 'interview',
      speaker: 'Tidjane Thiam',
    },
    {
      id: '7',
      youtubeId: '7hedfHz-1go',
      title: 'Grand meeting de mobilisation à Abidjan',
      date: '01.02.2026',
      category: 'evenement',
      speaker: 'PDCI-RDA',
    },
    {
      id: '8',
      youtubeId: 'IX6oR2DYbU4',
      title: 'Allocution sur le développement des régions',
      date: '28.01.2026',
      category: 'discours',
      speaker: 'Tidjane Thiam',
    },
    {
      id: '9',
      youtubeId: 'XM3_shRg7Sk',
      title: 'Le PDCI-RDA sur le plateau de RTI',
      date: '22.01.2026',
      category: 'passage-tv',
      speaker: 'PDCI-RDA',
    },
    {
      id: '10',
      youtubeId: '0aQu4fDkw9E',
      title: 'Séminaire de formation des cadres du parti',
      date: '18.01.2026',
      category: 'evenement',
      speaker: 'PDCI-RDA',
    },
    {
      id: '11',
      youtubeId: 'Dl1GeT6JH7s',
      title: 'Tidjane Thiam invité du journal de 20h',
      date: '12.01.2026',
      category: 'interview',
      speaker: 'Tidjane Thiam',
    },
    {
      id: '12',
      youtubeId: 'SlH93YI2VT0',
      title: 'Discours de clôture du congrès du PDCI-RDA',
      date: '05.01.2026',
      category: 'discours',
      speaker: 'Tidjane Thiam',
    },
  ];

  protected get filteredVideos(): Video[] {
    const filter = this.activeFilter();
    if (filter === 'all') return this.videos;
    return this.videos.filter(v => v.category === filter);
  }

  protected setFilter(key: string): void {
    this.activeFilter.set(key);
    this.playingVideo.set(null);
  }

  protected playVideo(youtubeId: string): void {
    this.playingVideo.set(youtubeId);
  }

  protected stopVideo(): void {
    this.playingVideo.set(null);
  }

  protected getThumbnail(youtubeId: string): string {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  protected getEmbedUrl(youtubeId: string): SafeResourceUrl {
    let url = this.embedUrlCache.get(youtubeId);
    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&enablejsapi=1`
      );
      this.embedUrlCache.set(youtubeId, url);
    }
    return url;
  }

  protected getCategoryLabel(key: string): string {
    return this.categories.find(c => c.key === key)?.label ?? key;
  }
}

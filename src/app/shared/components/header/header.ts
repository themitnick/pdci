import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly mobileMenuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Le Parti', path: '/parti' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Événements', path: '/evenements' },
    { label: 'Contact', path: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  protected toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}

import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-crm-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './crm-layout.html',
  styleUrl: './crm-layout.scss',
  host: { class: 'flex h-screen overflow-hidden bg-gray-50' },
})
export class CrmLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly sidebarOpen = signal(true);
  protected readonly mobileSidebarOpen = signal(false);

  protected readonly navGroups = [
    {
      label: 'Principal',
      items: [
        { label: 'Tableau de bord', path: '/crm/dashboard', icon: 'dashboard' },
        { label: 'Rôles & Accès', path: '/crm/roles', icon: 'shield' },
      ],
    },
    {
      label: 'Gestion',
      items: [
        { label: 'Militants', path: '/crm/militants', icon: 'people' },
        { label: 'Cotisations', path: '/crm/cotisations', icon: 'payments' },
        { label: 'Événements', path: '/crm/evenements', icon: 'event' },
      ],
    },
    {
      label: 'Communication',
      items: [
        { label: 'Campagnes', path: '/crm/campagnes', icon: 'megaphone' },
        { label: 'Diaspora', path: '/crm/diaspora', icon: 'globe' },
      ],
    },
    {
      label: 'Intelligence',
      items: [
        { label: 'Analyse', path: '/crm/analyse', icon: 'analytics' },
        { label: 'Paramètres', path: '/crm/parametres', icon: 'settings' },
      ],
    },
  ];

  protected readonly user = computed(() => {
    const u = this.auth.user();
    return u
      ? { name: u.nom, role: u.role, initials: u.initials }
      : { name: 'Admin PDCI', role: 'Administrateur', initials: 'AP' };
  });

  protected toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  protected toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update(v => !v);
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/crm/login');
  }
}

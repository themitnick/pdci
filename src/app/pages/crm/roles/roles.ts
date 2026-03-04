import { Component, signal } from '@angular/core';

interface Role {
  id: number;
  nom: string;
  code: string;
  description: string;
  couleur: string;
  bgCouleur: string;
  nbUtilisateurs: number;
  permissions: Record<string, ('lecture' | 'ecriture' | 'suppression')[]>;
}

@Component({
  selector: 'app-crm-roles',
  standalone: true,
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class CrmRoles {
  protected readonly selectedRole = signal<Role | null>(null);

  protected readonly modules = [
    'Dashboard',
    'Militants',
    'Cotisations',
    'Événements',
    'Campagnes',
    'Diaspora',
    'Analyse',
    'Paramètres',
  ];

  protected readonly roles: Role[] = [
    {
      id: 1,
      nom: 'Super Admin National',
      code: 'super_admin',
      description: 'Accès total à toutes les fonctionnalités du CRM, gestion des utilisateurs et des paramètres système.',
      couleur: 'text-red-700',
      bgCouleur: 'bg-red-100',
      nbUtilisateurs: 3,
      permissions: {
        'Dashboard': ['lecture'],
        'Militants': ['lecture', 'ecriture', 'suppression'],
        'Cotisations': ['lecture', 'ecriture', 'suppression'],
        'Événements': ['lecture', 'ecriture', 'suppression'],
        'Campagnes': ['lecture', 'ecriture', 'suppression'],
        'Diaspora': ['lecture', 'ecriture', 'suppression'],
        'Analyse': ['lecture', 'ecriture', 'suppression'],
        'Paramètres': ['lecture', 'ecriture', 'suppression'],
      },
    },
    {
      id: 2,
      nom: 'Admin Régional',
      code: 'admin_regional',
      description: 'Gestion complète des militants, cotisations et événements de sa région. Visibilité limitée aux données régionales.',
      couleur: 'text-blue-700',
      bgCouleur: 'bg-blue-100',
      nbUtilisateurs: 14,
      permissions: {
        'Dashboard': ['lecture'],
        'Militants': ['lecture', 'ecriture'],
        'Cotisations': ['lecture', 'ecriture'],
        'Événements': ['lecture', 'ecriture'],
        'Campagnes': ['lecture'],
        'Diaspora': [],
        'Analyse': ['lecture'],
        'Paramètres': ['lecture'],
      },
    },
    {
      id: 3,
      nom: 'Coordinateur Local',
      code: 'coordinateur_local',
      description: 'Gestion des militants et événements au niveau de sa section locale. Remontée d\'informations vers le niveau régional.',
      couleur: 'text-purple-700',
      bgCouleur: 'bg-purple-100',
      nbUtilisateurs: 48,
      permissions: {
        'Dashboard': ['lecture'],
        'Militants': ['lecture', 'ecriture'],
        'Cotisations': ['lecture'],
        'Événements': ['lecture', 'ecriture'],
        'Campagnes': [],
        'Diaspora': [],
        'Analyse': [],
        'Paramètres': [],
      },
    },
    {
      id: 4,
      nom: 'Responsable Diaspora',
      code: 'resp_diaspora',
      description: 'Gestion des militants de la diaspora, suivi des représentations internationales et indicateurs de mobilisation.',
      couleur: 'text-teal-700',
      bgCouleur: 'bg-teal-100',
      nbUtilisateurs: 6,
      permissions: {
        'Dashboard': ['lecture'],
        'Militants': ['lecture'],
        'Cotisations': ['lecture'],
        'Événements': ['lecture'],
        'Campagnes': ['lecture'],
        'Diaspora': ['lecture', 'ecriture', 'suppression'],
        'Analyse': ['lecture'],
        'Paramètres': [],
      },
    },
    {
      id: 5,
      nom: 'Agent Terrain',
      code: 'agent_terrain',
      description: 'Collecte de données sur le terrain, enregistrement de nouveaux militants, suivi des cotisations et remontée d\'activités.',
      couleur: 'text-amber-700',
      bgCouleur: 'bg-amber-100',
      nbUtilisateurs: 120,
      permissions: {
        'Dashboard': ['lecture'],
        'Militants': ['lecture', 'ecriture'],
        'Cotisations': ['lecture', 'ecriture'],
        'Événements': ['lecture'],
        'Campagnes': [],
        'Diaspora': [],
        'Analyse': [],
        'Paramètres': [],
      },
    },
    {
      id: 6,
      nom: 'Militant',
      code: 'militant',
      description: 'Accès limité à son propre profil, consultation des événements et cotisations personnelles.',
      couleur: 'text-gray-700',
      bgCouleur: 'bg-gray-100',
      nbUtilisateurs: 15340,
      permissions: {
        'Dashboard': [],
        'Militants': ['lecture'],
        'Cotisations': ['lecture'],
        'Événements': ['lecture'],
        'Campagnes': [],
        'Diaspora': [],
        'Analyse': [],
        'Paramètres': [],
      },
    },
  ];

  protected selectRole(r: Role): void {
    this.selectedRole.set(r);
  }

  protected hasPermission(role: Role, module: string, perm: string): boolean {
    return role.permissions[module]?.includes(perm as any) ?? false;
  }
}

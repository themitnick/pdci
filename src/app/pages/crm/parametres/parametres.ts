import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-crm-parametres',
  standalone: true,
  templateUrl: './parametres.html',
  styleUrl: './parametres.scss',
})
export class CrmParametres {
  protected readonly activeTab = signal('profil');

  protected readonly tabs = [
    { id: 'profil', label: 'Profil', icon: 'user' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'roles', label: 'Rôles & Accès', icon: 'shield' },
    { id: 'regions', label: 'Régions', icon: 'map' },
  ];

  protected readonly roles = [
    { nom: 'Super Administrateur', description: 'Accès complet à toutes les fonctionnalités', membres: 2 },
    { nom: 'Administrateur', description: 'Gestion des militants, cotisations et événements', membres: 5 },
    { nom: 'Responsable Régional', description: 'Gestion de la région assignée', membres: 14 },
    { nom: 'Responsable Section', description: 'Gestion de la section assignée', membres: 120 },
    { nom: 'Consultation', description: 'Lecture seule des données', membres: 8 },
  ];

  protected readonly notifSettings = [
    { label: 'Nouvelles adhésions', description: 'Recevoir une notification pour chaque nouvelle demande d\'adhésion', enabled: true },
    { label: 'Cotisations en retard', description: 'Alerte quand le taux de recouvrement descend sous 60%', enabled: true },
    { label: 'Rapports hebdomadaires', description: 'Recevoir un résumé par email chaque lundi', enabled: false },
    { label: 'Événements à venir', description: 'Rappel 48h avant un événement', enabled: true },
    { label: 'Alertes de sécurité', description: 'Connexions suspectes ou modifications critiques', enabled: true },
  ];

  protected readonly regionList = [
    { nom: 'Direction régionale d\'Abidjan', code: 'ABJ', sections: 42, responsable: 'Traoré Ibrahim' },
    { nom: 'Direction régionale de Bouaké', code: 'BKE', sections: 18, responsable: 'Koné Aminata' },
    { nom: 'Direction régionale de Yamoussoukro', code: 'YAM', sections: 14, responsable: 'Kouadio Jean' },
    { nom: 'Direction régionale de Daloa', code: 'DLA', sections: 12, responsable: 'Bamba Sékou' },
    { nom: 'Direction régionale de San Pedro', code: 'SPD', sections: 10, responsable: 'Touré Mamadou' },
    { nom: 'Direction régionale de Korhogo', code: 'KRH', sections: 9, responsable: 'Ouattara Fatou' },
  ];

  protected toggleNotif(index: number): void {
    this.notifSettings[index].enabled = !this.notifSettings[index].enabled;
  }
}

import { Component, inject, computed } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { AuthService } from '../../../core/auth.service';

interface RegionData {
  nom: string;
  code: string;
  militants: number;
  actifs: number;
  cotisationRate: number;
  adhesionsMois: number;
  heatLevel: 'high' | 'medium' | 'low' | 'critical';
}

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class CrmDashboard {
  private readonly auth = inject(AuthService);

  protected readonly userRole = computed(() => this.auth.user()?.role ?? 'Agent Terrain');
  protected readonly userName = computed(() => this.auth.user()?.nom ?? 'Utilisateur');

  /** Role detection helpers */
  protected readonly isAdmin = computed(() => this.userRole() === 'Super Admin National');
  protected readonly isRegional = computed(() => this.userRole() === 'Admin Régional');
  protected readonly isAgent = computed(() => this.userRole() === 'Agent Terrain');

  // ============================
  // SUPER ADMIN — Full national
  // ============================
  protected readonly kpis = [
    { label: 'Militants totaux', value: '45 213', change: '+2.4%', positive: true, icon: 'people', bg: 'bg-primary/10', color: 'text-primary' },
    { label: 'Militants actifs', value: '38 420', change: '+3.1%', positive: true, icon: 'active', bg: 'bg-green-50', color: 'text-green-600' },
    { label: 'Cotisations collectées', value: '128.5M FCFA', change: '+12.1%', positive: true, icon: 'money', bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Adhésions ce mois', value: '1 847', change: '+8.3%', positive: true, icon: 'person_add', bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Taux de cotisation', value: '73.2%', change: '-1.5%', positive: false, icon: 'percent', bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Diaspora', value: '4 830', change: '+5.7%', positive: true, icon: 'globe', bg: 'bg-teal-50', color: 'text-teal-600' },
  ];

  protected readonly regionData: RegionData[] = [
    { nom: 'Abidjan', code: 'ABJ', militants: 15420, actifs: 13120, cotisationRate: 0.82, adhesionsMois: 420, heatLevel: 'high' },
    { nom: 'Yamoussoukro', code: 'YAM', militants: 5210, actifs: 4580, cotisationRate: 0.78, adhesionsMois: 180, heatLevel: 'high' },
    { nom: 'Bouaké', code: 'BKE', militants: 6830, actifs: 5460, cotisationRate: 0.71, adhesionsMois: 210, heatLevel: 'medium' },
    { nom: 'Daloa', code: 'DLA', militants: 4580, actifs: 3200, cotisationRate: 0.65, adhesionsMois: 95, heatLevel: 'medium' },
    { nom: 'San Pedro', code: 'SPD', militants: 3920, actifs: 2940, cotisationRate: 0.69, adhesionsMois: 88, heatLevel: 'medium' },
    { nom: 'Korhogo', code: 'KRH', militants: 3440, actifs: 2750, cotisationRate: 0.74, adhesionsMois: 102, heatLevel: 'medium' },
    { nom: 'Man', code: 'MAN', militants: 2850, actifs: 1710, cotisationRate: 0.52, adhesionsMois: 45, heatLevel: 'low' },
    { nom: 'Gagnoa', code: 'GAG', militants: 2963, actifs: 2074, cotisationRate: 0.60, adhesionsMois: 55, heatLevel: 'low' },
  ];

  protected readonly demographics = [
    { tranche: '18-25 ans', count: 9947, pct: 22, color: 'bg-blue-500' },
    { tranche: '26-35 ans', count: 14016, pct: 31, color: 'bg-primary' },
    { tranche: '36-45 ans', count: 10851, pct: 24, color: 'bg-amber-500' },
    { tranche: '46-55 ans', count: 6330, pct: 14, color: 'bg-orange-500' },
    { tranche: '56-65 ans', count: 2713, pct: 6, color: 'bg-red-400' },
    { tranche: '65+ ans', count: 1356, pct: 3, color: 'bg-gray-400' },
  ];

  protected readonly monthlyAdhesions = [
    { mois: 'Jul', valeur: 1120 }, { mois: 'Aoû', valeur: 980 },
    { mois: 'Sep', valeur: 1340 }, { mois: 'Oct', valeur: 1210 },
    { mois: 'Nov', valeur: 1560 }, { mois: 'Déc', valeur: 1420 },
    { mois: 'Jan', valeur: 1680 }, { mois: 'Fév', valeur: 1520 },
    { mois: 'Mar', valeur: 1890 }, { mois: 'Avr', valeur: 1750 },
    { mois: 'Mai', valeur: 2010 }, { mois: 'Jun', valeur: 1847 },
  ];

  protected readonly recentActivities = [
    { id: 1, type: 'adhesion', description: 'Nouvelle adhésion — Koné Aminata (Bouaké)', time: 'Il y a 5 min' },
    { id: 2, type: 'campagne', description: 'Campagne SMS « Mobilisation Juin » envoyée — 12 400 destinataires', time: 'Il y a 12 min' },
    { id: 3, type: 'cotisation', description: 'Cotisation annuelle — Section Cocody (85 militants)', time: 'Il y a 30 min' },
    { id: 4, type: 'evenement', description: 'Inscription meeting Yamoussoukro — 45 militants', time: 'Il y a 1h' },
    { id: 5, type: 'diaspora', description: 'Nouvelle adhésion diaspora — Diarra Moussa (Paris, France)', time: 'Il y a 2h' },
    { id: 6, type: 'cotisation', description: 'Don de 500 000 FCFA — Bamba Sékou (Daloa)', time: 'Il y a 3h' },
  ];

  protected readonly pendingTasks = [
    { label: 'Adhésions en attente de validation', count: 127, color: 'amber' },
    { label: 'Cotisations à relancer', count: 342, color: 'red' },
    { label: 'Campagnes brouillons', count: 5, color: 'blue' },
    { label: 'Événements à valider', count: 8, color: 'purple' },
    { label: 'Demandes diaspora', count: 23, color: 'teal' },
  ];

  // ============================
  // ADMIN RÉGIONAL — Bouaké
  // ============================
  protected readonly regionalKpis = [
    { label: 'Militants région', value: '6 830', change: '+3.8%', positive: true, icon: 'people', bg: 'bg-primary/10', color: 'text-primary' },
    { label: 'Militants actifs', value: '5 460', change: '+2.1%', positive: true, icon: 'active', bg: 'bg-green-50', color: 'text-green-600' },
    { label: 'Cotisations collectées', value: '18.2M FCFA', change: '+9.4%', positive: true, icon: 'money', bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Adhésions ce mois', value: '210', change: '+15.2%', positive: true, icon: 'person_add', bg: 'bg-blue-50', color: 'text-blue-600' },
  ];

  protected readonly regionalSections = [
    { nom: 'Bouaké Centre', militants: 1850, actifs: 1520, cotisation: 0.78 },
    { nom: 'Bouaké Nord', militants: 1420, actifs: 1100, cotisation: 0.71 },
    { nom: 'Bouaké Sud', militants: 1280, actifs: 980, cotisation: 0.65 },
    { nom: 'Sakassou', militants: 890, actifs: 720, cotisation: 0.68 },
    { nom: 'Béoumi', militants: 760, actifs: 580, cotisation: 0.59 },
    { nom: 'Botro', militants: 630, actifs: 560, cotisation: 0.72 },
  ];

  protected readonly regionalMonthly = [
    { mois: 'Jan', valeur: 145 }, { mois: 'Fév', valeur: 162 },
    { mois: 'Mar', valeur: 178 }, { mois: 'Avr', valeur: 155 },
    { mois: 'Mai', valeur: 195 }, { mois: 'Jun', valeur: 210 },
  ];

  protected readonly regionalActivities = [
    { id: 1, type: 'adhesion', description: 'Nouvelle adhésion — Diallo Fatoumata (Bouaké Centre)', time: 'Il y a 15 min' },
    { id: 2, type: 'cotisation', description: 'Cotisation — Section Sakassou (32 militants)', time: 'Il y a 45 min' },
    { id: 3, type: 'evenement', description: 'Meeting section Bouaké Nord — 120 participants', time: 'Il y a 2h' },
    { id: 4, type: 'adhesion', description: 'Nouvelle adhésion — Touré Mamadou (Béoumi)', time: 'Il y a 3h' },
  ];

  protected readonly regionalTasks = [
    { label: 'Adhésions à valider', count: 18, color: 'amber' },
    { label: 'Cotisations en retard', count: 45, color: 'red' },
    { label: 'Événements à organiser', count: 3, color: 'purple' },
  ];

  // ============================
  // AGENT TERRAIN — Bouaké Centre
  // ============================
  protected readonly agentKpis = [
    { label: 'Militants suivis', value: '124', change: '+5', positive: true, icon: 'people', bg: 'bg-primary/10', color: 'text-primary' },
    { label: 'Visites ce mois', value: '38', change: '+12', positive: true, icon: 'active', bg: 'bg-green-50', color: 'text-green-600' },
    { label: 'Cotisations collectées', value: '1.2M FCFA', change: '+18%', positive: true, icon: 'money', bg: 'bg-amber-50', color: 'text-amber-600' },
  ];

  protected readonly agentTodayTasks = [
    { id: 1, label: 'Visite militant — Koné Sékou (Quartier Commerce)', time: '09:00', done: true },
    { id: 2, label: 'Relance cotisation — Bamba Aïcha', time: '10:30', done: true },
    { id: 3, label: 'Inscription nouveau membre — Coulibaly M.', time: '14:00', done: false },
    { id: 4, label: 'Distribution cartes — Section Bouaké Centre', time: '15:30', done: false },
    { id: 5, label: 'Rapport journalier au coordinateur', time: '17:00', done: false },
  ];

  protected readonly agentRecentMilitants = [
    { nom: 'Koné Sékou', phone: '+225 07 08 09 10', statut: 'actif', dernierContacte: 'Aujourd\'hui' },
    { nom: 'Bamba Aïcha', phone: '+225 05 12 34 56', statut: 'cotisation_retard', dernierContacte: 'Hier' },
    { nom: 'Traoré Ali', phone: '+225 01 23 45 67', statut: 'actif', dernierContacte: 'Il y a 2j' },
    { nom: 'Diallo Mariam', phone: '+225 07 89 01 23', statut: 'nouveau', dernierContacte: 'Il y a 3j' },
    { nom: 'Ouattara Yves', phone: '+225 05 67 89 01', statut: 'inactif', dernierContacte: 'Il y a 7j' },
  ];

  protected readonly agentWeeklyStats = [
    { jour: 'Lun', visites: 8 }, { jour: 'Mar', visites: 6 },
    { jour: 'Mer', visites: 10 }, { jour: 'Jeu', visites: 7 },
    { jour: 'Ven', visites: 5 }, { jour: 'Sam', visites: 2 },
  ];

  protected readonly maxAdhesion = 2010;
  protected readonly maxRegionalAdhesion = 210;
  protected readonly maxAgentVisites = 10;
  protected readonly maxRegionMilitants = 15420;

  protected getActivityBadge(type: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      adhesion: { bg: 'bg-green-100', text: 'text-green-700', label: 'Adhésion' },
      cotisation: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Cotisation' },
      campagne: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Campagne' },
      evenement: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Événement' },
      diaspora: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Diaspora' },
    };
    return map[type] || { bg: 'bg-gray-100', text: 'text-gray-700', label: type };
  }

  protected getHeatColor(level: string): string {
    const map: Record<string, string> = {
      high: 'bg-primary text-white',
      medium: 'bg-primary/60 text-white',
      low: 'bg-primary/30 text-gray-800',
      critical: 'bg-red-500 text-white',
    };
    return map[level] || 'bg-gray-200 text-gray-600';
  }

  protected getStatutBadge(statut: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      actif: { bg: 'bg-green-100', text: 'text-green-700', label: 'Actif' },
      cotisation_retard: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cotis. retard' },
      nouveau: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Nouveau' },
      inactif: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Inactif' },
    };
    return map[statut] || { bg: 'bg-gray-100', text: 'text-gray-600', label: statut };
  }
}

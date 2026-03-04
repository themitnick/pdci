import { Component } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

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

  protected readonly maxAdhesion = 2010;
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
}

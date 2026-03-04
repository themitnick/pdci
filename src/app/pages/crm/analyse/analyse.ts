import { Component, signal, computed } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

interface RegionAnalyse {
  region: string;
  militants: number;
  actifs: number;
  cotisations: number;
  adhesions: number;
  evenements: number;
  tauxActivite: number;
  tendance: 'hausse' | 'stable' | 'baisse';
}

@Component({
  selector: 'app-crm-analyse',
  standalone: true,
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './analyse.html',
  styleUrl: './analyse.scss',
})
export class CrmAnalyse {
  protected readonly selectedTab = signal<'vue_globale' | 'comparatif' | 'decision'>('vue_globale');
  protected readonly selectedPeriode = signal('12mois');

  protected readonly kpis = [
    { label: 'Croissance militants', valeur: '+12.5%', icon: 'trending-up', couleur: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Taux rétention', valeur: '87%', icon: 'shield', couleur: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Engagement moyen', valeur: '64%', icon: 'activity', couleur: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Score mobilisation', valeur: '7.8/10', icon: 'zap', couleur: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  protected readonly regionsData: RegionAnalyse[] = [
    { region: 'Abidjan', militants: 5200, actifs: 4100, cotisations: 3800, adhesions: 420, evenements: 12, tauxActivite: 0.79, tendance: 'hausse' },
    { region: 'Bouaké', militants: 2800, actifs: 2100, cotisations: 1900, adhesions: 180, evenements: 8, tauxActivite: 0.75, tendance: 'hausse' },
    { region: 'Yamoussoukro', militants: 1900, actifs: 1400, cotisations: 1250, adhesions: 120, evenements: 6, tauxActivite: 0.74, tendance: 'stable' },
    { region: 'Daloa', militants: 1200, actifs: 850, cotisations: 720, adhesions: 85, evenements: 5, tauxActivite: 0.71, tendance: 'stable' },
    { region: 'San Pedro', militants: 980, actifs: 620, cotisations: 510, adhesions: 95, evenements: 4, tauxActivite: 0.63, tendance: 'baisse' },
    { region: 'Korhogo', militants: 1500, actifs: 1100, cotisations: 980, adhesions: 140, evenements: 7, tauxActivite: 0.73, tendance: 'hausse' },
    { region: 'Man', militants: 800, actifs: 520, cotisations: 420, adhesions: 60, evenements: 3, tauxActivite: 0.65, tendance: 'baisse' },
    { region: 'Gagnoa', militants: 650, actifs: 480, cotisations: 390, adhesions: 55, evenements: 4, tauxActivite: 0.74, tendance: 'stable' },
  ];

  protected readonly monthlyData = [
    { mois: 'Avr', adhesions: 85, departs: 12 },
    { mois: 'Mai', adhesions: 92, departs: 15 },
    { mois: 'Jun', adhesions: 78, departs: 10 },
    { mois: 'Jul', adhesions: 105, departs: 8 },
    { mois: 'Aoû', adhesions: 110, departs: 14 },
    { mois: 'Sep', adhesions: 95, departs: 11 },
    { mois: 'Oct', adhesions: 120, departs: 9 },
    { mois: 'Nov', adhesions: 135, departs: 7 },
    { mois: 'Déc', adhesions: 88, departs: 18 },
    { mois: 'Jan', adhesions: 140, departs: 12 },
    { mois: 'Fév', adhesions: 155, departs: 10 },
    { mois: 'Mar', adhesions: 168, departs: 8 },
  ];

  protected readonly decisionIndicateurs = [
    { label: 'Régions nécessitant un renforcement', valeur: '3', detail: 'San Pedro, Man, Gagnoa — taux d\'activité < 70%', type: 'alerte' as const },
    { label: 'Potentiel de mobilisation diaspora', valeur: 'Élevé', detail: 'France et Belgique montrent une croissance de +15% sur 6 mois', type: 'opportunite' as const },
    { label: 'Risque d\'attrition', valeur: 'Modéré', detail: '340 militants inactifs depuis 6+ mois, dont 120 cotisants réguliers', type: 'risque' as const },
    { label: 'Recommandation campagne', valeur: 'Jeunes 18-30', detail: 'Segment sous-représenté avec forte croissance potentielle (+23% vs année précédente)', type: 'recommandation' as const },
    { label: 'Prochain objectif d\'adhésion', valeur: '20 000', detail: 'À ce rythme, atteignable d\'ici août 2026. Accélérer les régions de l\'Ouest.', type: 'objectif' as const },
  ];

  protected readonly maxAdhesion = computed(() =>
    Math.max(...this.monthlyData.map(m => m.adhesions))
  );

  protected getTendanceIcon(t: string): { icon: string; color: string } {
    if (t === 'hausse') return { icon: '↑', color: 'text-green-600' };
    if (t === 'baisse') return { icon: '↓', color: 'text-red-500' };
    return { icon: '→', color: 'text-gray-400' };
  }

  protected getIndicateurStyle(type: string): { bg: string; border: string; icon: string } {
    const map: Record<string, { bg: string; border: string; icon: string }> = {
      alerte: { bg: 'bg-red-50', border: 'border-red-200', icon: '⚠️' },
      opportunite: { bg: 'bg-green-50', border: 'border-green-200', icon: '🚀' },
      risque: { bg: 'bg-amber-50', border: 'border-amber-200', icon: '⚡' },
      recommandation: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '💡' },
      objectif: { bg: 'bg-purple-50', border: 'border-purple-200', icon: '🎯' },
    };
    return map[type] || { bg: 'bg-gray-50', border: 'border-gray-200', icon: '📊' };
  }
}

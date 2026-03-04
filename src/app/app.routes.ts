import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'parti',
    loadComponent: () => import('./pages/parti/parti').then(m => m.Parti),
    children: [
      { path: '', redirectTo: 'histoire', pathMatch: 'full' },
      { path: 'histoire', loadComponent: () => import('./pages/parti/histoire/histoire').then(m => m.Histoire) },
      { path: 'vision', loadComponent: () => import('./pages/parti/vision/vision').then(m => m.Vision) },
      { path: 'organigramme', loadComponent: () => import('./pages/parti/organigramme/organigramme').then(m => m.Organigramme) },
      { path: 'instances', loadComponent: () => import('./pages/parti/instances/instances').then(m => m.Instances) },
      { path: 'statuts', loadComponent: () => import('./pages/parti/statuts/statuts').then(m => m.Statuts) },
    ],
  },
  {
    path: 'videos',
    loadComponent: () => import('./pages/videos/videos').then(m => m.Videos),
  },
  {
    path: 'actualites',
    loadComponent: () => import('./pages/actualites/actualites').then(m => m.Actualites),
  },
  {
    path: 'evenements',
    loadComponent: () => import('./pages/evenements/evenements').then(m => m.Evenements),
  },
  {
    path: 'adhesion',
    loadComponent: () => import('./pages/adhesion/adhesion').then(m => m.Adhesion),
  },
  {
    path: 'dons',
    loadComponent: () => import('./pages/dons/dons').then(m => m.Dons),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
  },
  {
    path: 'crm',
    children: [
      { path: 'login', loadComponent: () => import('./pages/crm/login/login').then(m => m.CrmLogin) },
      {
        path: '',
        loadComponent: () => import('./pages/crm/crm-layout').then(m => m.CrmLayout),
        canActivate: [authGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./pages/crm/dashboard/dashboard').then(m => m.CrmDashboard) },
      { path: 'roles', loadComponent: () => import('./pages/crm/roles/roles').then(m => m.CrmRoles) },
      { path: 'militants', loadComponent: () => import('./pages/crm/militants/militants').then(m => m.CrmMilitants) },
      { path: 'cotisations', loadComponent: () => import('./pages/crm/cotisations/cotisations').then(m => m.CrmCotisations) },
      { path: 'evenements', loadComponent: () => import('./pages/crm/evenements/evenements').then(m => m.CrmEvenements) },
      { path: 'campagnes', loadComponent: () => import('./pages/crm/campagnes/campagnes').then(m => m.CrmCampagnes) },
      { path: 'diaspora', loadComponent: () => import('./pages/crm/diaspora/diaspora').then(m => m.CrmDiaspora) },
      { path: 'analyse', loadComponent: () => import('./pages/crm/analyse/analyse').then(m => m.CrmAnalyse) },
      { path: 'statistiques', redirectTo: 'analyse', pathMatch: 'full' },
      { path: 'parametres', loadComponent: () => import('./pages/crm/parametres/parametres').then(m => m.CrmParametres) },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

import { Injectable, signal, computed } from '@angular/core';

export interface AuthUser {
  email: string;
  nom: string;
  role: string;
  initials: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'crm_auth_token';
  private readonly USER_KEY = 'crm_auth_user';

  private readonly _user = signal<AuthUser | null>(this.loadUser());
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  /** Demo credentials — in production, call a real API */
  private readonly validCredentials: { email: string; password: string; user: AuthUser }[] = [
    { email: 'admin@pdci.ci', password: 'Admin@2026', user: { email: 'admin@pdci.ci', nom: 'Admin PDCI', role: 'Super Admin National', initials: 'AP' } },
    { email: 'regional@pdci.ci', password: 'Region@2026', user: { email: 'regional@pdci.ci', nom: 'Koné Aminata', role: 'Admin Régional', initials: 'KA' } },
    { email: 'agent@pdci.ci', password: 'Agent@2026', user: { email: 'agent@pdci.ci', nom: 'Traoré Ibrahim', role: 'Agent Terrain', initials: 'TI' } },
  ];

  login(email: string, password: string): { success: boolean; error?: string } {
    const match = this.validCredentials.find(c => c.email === email && c.password === password);
    if (!match) {
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }
    sessionStorage.setItem(this.TOKEN_KEY, btoa(`${email}:${Date.now()}`));
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(match.user));
    this._user.set(match.user);
    return { success: true };
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this._user.set(null);
  }

  private loadUser(): AuthUser | null {
    try {
      const token = sessionStorage.getItem(this.TOKEN_KEY);
      const user = sessionStorage.getItem(this.USER_KEY);
      if (token && user) return JSON.parse(user);
    } catch { /* ignore */ }
    return null;
  }
}

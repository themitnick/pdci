import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-crm-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
  host: { class: 'flex items-center justify-center min-h-screen bg-gray-900' },
})
export class CrmLogin {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly error = signal('');
  protected readonly loading = signal(false);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.error.set('');
    this.loading.set(true);

    // Simulate a small delay
    setTimeout(() => {
      const result = this.auth.login(this.email(), this.password());
      this.loading.set(false);

      if (result.success) {
        this.router.navigateByUrl('/crm/dashboard');
      } else {
        this.error.set(result.error || 'Erreur de connexion');
      }
    }, 600);
  }

  protected updateEmail(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  protected updatePassword(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
  }

  protected loginAs(email: string, password: string): void {
    this.error.set('');
    this.loading.set(true);
    setTimeout(() => {
      const result = this.auth.login(email, password);
      this.loading.set(false);
      if (result.success) {
        this.router.navigateByUrl('/crm/dashboard');
      } else {
        this.error.set(result.error || 'Erreur de connexion');
      }
    }, 400);
  }
}

import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'flex flex-col min-h-screen' },
})
export class App {
  private readonly router = inject(Router);
  private readonly url = toSignal(this.router.events.pipe(map(() => this.router.url)), { initialValue: this.router.url });
  protected readonly isCrm = computed(() => this.url().startsWith('/crm'));
}

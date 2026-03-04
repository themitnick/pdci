import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Coordination {
  region: string;
  responsable: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly isSubmitting = signal(false);
  protected readonly isSubmitted = signal(false);
  protected contactForm: FormGroup;

  protected readonly subjects = [
    'Renseignement général',
    'Adhésion',
    'Don ou parrainage',
    'Presse et médias',
    'Partenariat',
    'Réclamation',
    'Autre',
  ];

  protected readonly coordinations: Coordination[] = [
    { region: 'Abidjan', responsable: 'Secrétariat Général', phone: '+225 27 22 44 53 00', email: 'abidjan@pdci-rda.ci', address: 'Cocody, rue des Jardins' },
    { region: 'Yamoussoukro', responsable: 'Coordination Centre', phone: '+225 27 30 64 00 00', email: 'centre@pdci-rda.ci', address: 'Quartier Habitat' },
    { region: 'Bouaké', responsable: 'Coordination Nord', phone: '+225 27 31 63 00 00', email: 'nord@pdci-rda.ci', address: 'Quartier Commerce' },
    { region: 'San Pedro', responsable: 'Coordination Sud-Ouest', phone: '+225 27 34 71 00 00', email: 'sudouest@pdci-rda.ci', address: 'Boulevard Maritime' },
    { region: 'Korhogo', responsable: 'Coordination Savanes', phone: '+225 27 36 86 00 00', email: 'savanes@pdci-rda.ci', address: 'Avenue de la République' },
    { region: 'Man', responsable: 'Coordination Ouest', phone: '+225 27 33 79 00 00', email: 'ouest@pdci-rda.ci', address: 'Centre-ville' },
  ];

  protected readonly selectedRegion = signal('');

  protected get filteredCoordinations(): Coordination[] {
    const region = this.selectedRegion();
    if (!region) return this.coordinations;
    return this.coordinations.filter(c => c.region === region);
  }

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  protected filterByRegion(event: Event): void {
    this.selectedRegion.set((event.target as HTMLSelectElement).value);
  }

  protected submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.contactForm.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }

  protected isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && control.touched;
  }
}

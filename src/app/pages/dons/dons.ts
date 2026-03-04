import { Component, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dons',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dons.html',
  styleUrl: './dons.scss',
})
export class Dons {
  protected readonly selectedAmount = signal<number | null>(null);
  protected readonly customAmount = signal<string>('');
  protected readonly isSubmitting = signal(false);
  protected readonly isComplete = signal(false);
  protected readonly step = signal<'amount' | 'info' | 'payment'>('amount');

  protected readonly suggestedAmounts = [
    { value: 5000, label: '5 000' },
    { value: 10000, label: '10 000' },
    { value: 25000, label: '25 000' },
    { value: 50000, label: '50 000' },
    { value: 100000, label: '100 000' },
    { value: 500000, label: '500 000' },
  ];

  protected readonly paymentMethods = [
    { id: 'orange', label: 'Orange Money', icon: '📱' },
    { id: 'mtn', label: 'MTN Money', icon: '📱' },
    { id: 'wave', label: 'Wave', icon: '📱' },
    { id: 'card', label: 'Carte bancaire', icon: '💳' },
    { id: 'transfer', label: 'Virement bancaire', icon: '🏦' },
  ];

  protected readonly selectedPayment = signal('orange');
  protected donorForm: FormGroup;

  protected readonly finalAmount = computed(() => {
    if (this.selectedAmount() !== null) return this.selectedAmount()!;
    const custom = parseInt(this.customAmount(), 10);
    return isNaN(custom) ? 0 : custom;
  });

  constructor(private fb: FormBuilder) {
    this.donorForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      anonymous: [false],
      receiptNeeded: [true],
    });
  }

  protected selectAmount(amount: number): void {
    this.selectedAmount.set(amount);
    this.customAmount.set('');
  }

  protected onCustomAmountChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.customAmount.set(value);
    this.selectedAmount.set(null);
  }

  protected nextStep(): void {
    if (this.step() === 'amount' && this.finalAmount() > 0) {
      this.step.set('info');
    } else if (this.step() === 'info') {
      if (this.donorForm.get('anonymous')?.value || this.donorForm.valid) {
        this.step.set('payment');
      } else {
        this.donorForm.markAllAsTouched();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected prevStep(): void {
    if (this.step() === 'info') this.step.set('amount');
    else if (this.step() === 'payment') this.step.set('info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected selectPayment(id: string): void {
    this.selectedPayment.set(id);
  }

  protected submit(): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isComplete.set(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  }

  protected formatAmount(amount: number): string {
    return amount.toLocaleString('fr-FR');
  }

  protected isFieldInvalid(field: string): boolean {
    const control = this.donorForm.get(field);
    return !!control && control.invalid && control.touched;
  }
}

import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adhesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adhesion.html',
  styleUrl: './adhesion.scss',
})
export class Adhesion {
  protected readonly currentStep = signal(1);
  protected readonly totalSteps = 4;
  protected readonly isSubmitting = signal(false);
  protected readonly isComplete = signal(false);

  protected readonly steps = [
    'Informations personnelles',
    'Section locale',
    'Récapitulatif',
    'Paiement',
  ];

  protected personalForm: FormGroup;
  protected sectionForm: FormGroup;

  protected readonly regions = [
    'Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San Pedro',
    'Korhogo', 'Man', 'Gagnoa', 'Abengourou', 'Divo',
    'Diaspora — France', 'Diaspora — USA', 'Diaspora — Canada',
  ];

  protected readonly paymentMethods = [
    { id: 'orange', label: 'Orange Money', icon: '📱' },
    { id: 'mtn', label: 'MTN Money', icon: '📱' },
    { id: 'wave', label: 'Wave', icon: '📱' },
    { id: 'card', label: 'Carte bancaire', icon: '💳' },
  ];

  protected selectedPayment = signal('orange');

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['Ivoirienne', Validators.required],
      idNumber: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{8,15}$/)]],
      email: ['', Validators.email],
      address: ['', Validators.required],
      profession: [''],
    });

    this.sectionForm = this.fb.group({
      region: ['', Validators.required],
      section: ['', Validators.required],
      acceptStatuts: [false, Validators.requiredTrue],
      acceptData: [false, Validators.requiredTrue],
      certifyInfo: [false, Validators.requiredTrue],
    });
  }

  protected nextStep(): void {
    if (this.currentStep() === 1 && this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }
    if (this.currentStep() === 2 && this.sectionForm.invalid) {
      this.sectionForm.markAllAsTouched();
      return;
    }
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  protected prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  protected selectPayment(method: string): void {
    this.selectedPayment.set(method);
  }

  protected submit(): void {
    this.isSubmitting.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isComplete.set(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  }

  protected isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!control && control.invalid && control.touched;
  }
}

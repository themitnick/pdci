import { Component, signal, computed, ElementRef, HostListener } from '@angular/core';
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
    { id: 'mobile_money', label: 'Mobile Money', image: 'payments/Operateurs-Mobile-Money.jpg' },
    { id: 'card', label: 'Carte bancaire', image: 'payments/Card-icon.png' },
    { id: 'transfer', label: 'Virement bancaire', image: '' },
    { id: 'paypal', label: 'PayPal', image: 'payments/paypal-icon.png' },
  ];

  protected readonly mobileOperators = [
    { id: 'orange', label: 'Orange Money', image: 'payments/Orange_Money.png' },
    { id: 'mtn', label: 'MTN Money', image: 'payments/mtn-mobile.png' },
    { id: 'moov', label: 'Moov Money', image: 'payments/moov-money.jpeg' },
    { id: 'wave', label: 'Wave', image: 'payments/wave.png' },
  ];

  protected readonly idTypes = [
    { value: 'cni', label: 'CNI (Carte Nationale d\'Identité)' },
    { value: 'passeport', label: 'Passeport' },
    { value: 'attestation', label: 'Attestation de Nationalité' },
    { value: 'titre_sejour', label: 'Titre de séjour (Diaspora)' },
  ];

  protected selectedPayment = signal('mobile_money');
  protected readonly selectedOperator = signal('orange');

  // ── Calendar date picker state ──
  protected readonly calendarOpen = signal(false);
  protected readonly calViewYear = signal(new Date().getFullYear());
  protected readonly calViewMonth = signal(new Date().getMonth()); // 0-based
  protected readonly selectedDate = signal<Date | null>(null);

  protected readonly monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];
  protected readonly dayLabels = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

  protected readonly calendarDays = computed(() => {
    const year = this.calViewYear();
    const month = this.calViewMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    // Monday = 0 ... Sunday = 6
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;
    const days: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
    return days;
  });

  protected readonly calendarYears = computed(() => {
    const current = new Date().getFullYear();
    const years: number[] = [];
    for (let y = current; y >= current - 100; y--) years.push(y);
    return years;
  });

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['Ivoirienne', Validators.required],
      idType: ['cni', Validators.required],
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

  protected selectOperator(id: string): void {
    this.selectedOperator.set(id);
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

  // ── Calendar methods ──
  protected toggleCalendar(): void {
    this.calendarOpen.update(v => !v);
  }

  protected calPrevMonth(): void {
    if (this.calViewMonth() === 0) {
      this.calViewMonth.set(11);
      this.calViewYear.update(y => y - 1);
    } else {
      this.calViewMonth.update(m => m - 1);
    }
  }

  protected calNextMonth(): void {
    if (this.calViewMonth() === 11) {
      this.calViewMonth.set(0);
      this.calViewYear.update(y => y + 1);
    } else {
      this.calViewMonth.update(m => m + 1);
    }
  }

  protected calSelectDay(day: number): void {
    const date = new Date(this.calViewYear(), this.calViewMonth(), day);
    this.selectedDate.set(date);
    // Format as YYYY-MM-DD for the form control
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    this.personalForm.get('dateOfBirth')?.setValue(`${yyyy}-${mm}-${dd}`);
    this.calendarOpen.set(false);
  }

  protected calIsSelected(day: number): boolean {
    const sel = this.selectedDate();
    if (!sel) return false;
    return sel.getFullYear() === this.calViewYear()
      && sel.getMonth() === this.calViewMonth()
      && sel.getDate() === day;
  }

  protected calIsToday(day: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.calViewYear()
      && today.getMonth() === this.calViewMonth()
      && today.getDate() === day;
  }

  protected calIsFuture(day: number): boolean {
    const date = new Date(this.calViewYear(), this.calViewMonth(), day);
    return date > new Date();
  }

  protected onCalYearChange(event: Event): void {
    const val = +(event.target as HTMLSelectElement).value;
    this.calViewYear.set(val);
  }

  protected onCalMonthChange(event: Event): void {
    const val = +(event.target as HTMLSelectElement).value;
    this.calViewMonth.set(val);
  }

  protected get formattedDate(): string {
    const sel = this.selectedDate();
    if (!sel) return '';
    return `${String(sel.getDate()).padStart(2, '0')}/${String(sel.getMonth() + 1).padStart(2, '0')}/${sel.getFullYear()}`;
  }
}

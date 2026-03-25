import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

interface TaxBracket {
  income: string;
  maxIncome: number;
  avgTaxPercent: number;
  consumptionTaxPercent: number;
  incomeTaxPercent: number;
  estimatedSusContribution: string;
  characteristic: string;
  colorClass: string;
  badgeClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  salary = signal<number | null>(null);
  displaySalary = signal<string>('');

  taxBrackets: TaxBracket[] = [
    { income: 'Ate R$ 1.500', maxIncome: 1500, avgTaxPercent: 25, consumptionTaxPercent: 25, incomeTaxPercent: 0, estimatedSusContribution: '~ R$ 45,00 / mes', characteristic: 'Regressivo (paga muito proporcionalmente)', colorClass: 'bg-rose-50/50 text-rose-700 border-rose-100', badgeClass: '' },
    { income: 'Ate R$ 3.000', maxIncome: 3000, avgTaxPercent: 27, consumptionTaxPercent: 24, incomeTaxPercent: 3, estimatedSusContribution: '~ R$ 97,00 / mes', characteristic: 'Ainda regressivo', colorClass: 'bg-rose-50/50 text-rose-700 border-rose-100', badgeClass: '' },
    { income: 'Ate R$ 8.000', maxIncome: 8000, avgTaxPercent: 30, consumptionTaxPercent: 18, incomeTaxPercent: 12, estimatedSusContribution: '~ R$ 288,00 / mes', characteristic: 'Misto', colorClass: 'bg-amber-50/50 text-amber-700 border-amber-100', badgeClass: '' },
    { income: 'Ate R$ 20.000', maxIncome: 20000, avgTaxPercent: 32, consumptionTaxPercent: 12, incomeTaxPercent: 20, estimatedSusContribution: '~ R$ 768,00 / mes', characteristic: 'Mais progressivo', colorClass: 'bg-emerald-50/50 text-emerald-700 border-emerald-100', badgeClass: '' },
    { income: 'R$ 100.000+', maxIncome: Infinity, avgTaxPercent: 25, consumptionTaxPercent: 8, incomeTaxPercent: 17, estimatedSusContribution: '~ R$ 2.400 a 3.000 / mes', characteristic: 'Volta a ser regressivo', colorClass: 'bg-rose-50/50 text-rose-700 border-rose-100', badgeClass: '' },
  ];

  currentBracket = computed(() => {
    const currentSalary = this.salary();
    if (currentSalary === null || currentSalary <= 0) return null;

    for (const bracket of this.taxBrackets) {
      if (currentSalary <= bracket.maxIncome) {
        return bracket;
      }
    }

    return this.taxBrackets[this.taxBrackets.length - 1];
  });

  estimatedSusTaxPaid = computed(() => {
    const bracket = this.currentBracket();
    if (!bracket) return 0;

    const totalTax = this.calculateTaxAmount(bracket.avgTaxPercent);
    // Aproximadamente 12% da arrecadacao total de impostos vai para a saude publica (SUS)
    return totalTax * 0.12;
  });

  estimatedConsumptionTaxPaid = computed(() => {
    const bracket = this.currentBracket();
    if (!bracket) return 0;

    return this.calculateTaxAmount(bracket.consumptionTaxPercent);
  });

  estimatedIncomeTaxPaid = computed(() => {
    const bracket = this.currentBracket();
    if (!bracket) return 0;

    return this.calculateTaxAmount(bracket.incomeTaxPercent);
  });

  susTaxPercentOfIncome = computed(() => {
    const bracket = this.currentBracket();
    if (!bracket) return 0;

    return bracket.avgTaxPercent * 0.12;
  });

  private calculateTaxAmount(percent: number) {
    const currentSalary = this.salary();
    if (currentSalary === null || currentSalary <= 0) return 0;

    return (currentSalary * percent) / 100;
  }

  onSalaryChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/\D/g, '');

    if (!rawValue) {
      this.salary.set(null);
      this.displaySalary.set('');
      input.value = '';
      return;
    }

    const numericValue = parseInt(rawValue, 10) / 100;
    this.salary.set(numericValue);

    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);

    this.displaySalary.set(formatted);
    input.value = formatted;
  }
}

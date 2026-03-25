import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

interface TaxBracket {
  income: string;
  maxIncome: number;
  mainTax: string;
  avgTaxPercent: number;
  estimatedTax: string;
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
    { income: 'Até R$ 1.500', maxIncome: 1500, mainTax: 'Consumo (ICMS, PIS, Cofins)', avgTaxPercent: 25, estimatedTax: '~ R$ 45,00 / mês', characteristic: 'Regressivo (paga muito proporcionalmente)', colorClass: 'bg-rose-50/50 text-rose-700 border-rose-100', badgeClass: '' },
    { income: 'Até R$ 3.000', maxIncome: 3000, mainTax: 'Consumo + pouco IR', avgTaxPercent: 27, estimatedTax: '~ R$ 97,00 / mês', characteristic: 'Ainda regressivo', colorClass: 'bg-rose-50/50 text-rose-700 border-rose-100', badgeClass: '' },
    { income: 'Até R$ 8.000', maxIncome: 8000, mainTax: 'Consumo + IR', avgTaxPercent: 30, estimatedTax: '~ R$ 288,00 / mês', characteristic: 'Misto', colorClass: 'bg-amber-50/50 text-amber-700 border-amber-100', badgeClass: '' },
    { income: 'Até R$ 20.000', maxIncome: 20000, mainTax: 'IR + consumo', avgTaxPercent: 32, estimatedTax: '~ R$ 768,00 / mês', characteristic: 'Mais progressivo', colorClass: 'bg-emerald-50/50 text-emerald-700 border-emerald-100', badgeClass: '' },
    { income: 'R$ 100.000+', maxIncome: Infinity, mainTax: 'IR + investimentos', avgTaxPercent: 25, estimatedTax: '~ R$ 2.400 a 3.000 / mês', characteristic: 'Volta a ser regressivo', colorClass: 'bg-rose-50/50 text-rose-700 border-rose-100', badgeClass: '' },
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
    const currentSalary = this.salary();
    const bracket = this.currentBracket();
    if (currentSalary === null || currentSalary <= 0 || !bracket) return 0;
    const totalTax = (currentSalary * bracket.avgTaxPercent) / 100;
    // Aproximadamente 12% da arrecadação total de impostos vai para a saúde pública (SUS)
    return totalTax * 0.12;
  });

  susTaxPercentOfIncome = computed(() => {
    const bracket = this.currentBracket();
    if (!bracket) return 0;
    return bracket.avgTaxPercent * 0.12;
  });

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
      currency: 'BRL'
    }).format(numericValue);

    this.displaySalary.set(formatted);
    input.value = formatted;
  }
}

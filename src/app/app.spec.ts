import {TestBed} from '@angular/core/testing';
import {App} from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should split the estimated burden between consumption taxes and income tax', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.salary.set(3000);

    expect(app.currentBracket()?.consumptionTaxPercent).toBe(24);
    expect(app.currentBracket()?.incomeTaxPercent).toBe(3);
    expect(app.estimatedConsumptionTaxPaid()).toBe(720);
    expect(app.estimatedIncomeTaxPaid()).toBe(90);
    expect(app.estimatedSusTaxPaid()).toBeCloseTo(97.2, 5);
  });
});

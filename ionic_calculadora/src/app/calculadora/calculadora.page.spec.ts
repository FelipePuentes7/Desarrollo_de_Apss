import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculadoraPage } from './calculadora.page';

describe('CalculadoraPage', () => {
  let component: CalculadoraPage;
  let fixture: ComponentFixture<CalculadoraPage>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [CalculadoraPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el estado inicial correcto', () => {
    expect(component.numero1).toBeNull();
    expect(component.numero2).toBeNull();
    expect(component.operacion).toBe('+');
    expect(component.resultado).toBeNull();
    expect(component.historial).toEqual([]);
  });

  it('no debe calcular si numero1 es null', () => {
    component.numero1 = null;
    component.numero2 = 5;
    component.operacion = '+';
    component.calcular();

    expect(component.resultado).toBeNull();
    expect(component.historial.length).toBe(0);
  });

  it('no debe calcular si numero2 es null', () => {
    component.numero1 = 10;
    component.numero2 = null;
    component.operacion = '+';
    component.calcular();

    expect(component.resultado).toBeNull();
    expect(component.historial.length).toBe(0);
  });

  it('debe realizar la suma correctamente', () => {
    component.numero1 = 12;
    component.numero2 = 8;
    component.operacion = '+';
    component.calcular();

    expect(component.resultado).toBe(20);
    expect(component.historial).toEqual(['12 + 8 = 20']);
  });

  it('debe realizar la resta correctamente', () => {
    component.numero1 = 25;
    component.numero2 = 10;
    component.operacion = '-';
    component.calcular();

    expect(component.resultado).toBe(15);
    expect(component.historial).toEqual(['25 - 10 = 15']);
  });

  it('debe realizar la multiplicación correctamente', () => {
    component.numero1 = 7;
    component.numero2 = 6;
    component.operacion = '*';
    component.calcular();

    expect(component.resultado).toBe(42);
    expect(component.historial).toEqual(['7 * 6 = 42']);
  });

  it('debe realizar la división correctamente', () => {
    component.numero1 = 20;
    component.numero2 = 4;
    component.operacion = '/';
    component.calcular();

    expect(component.resultado).toBe(5);
    expect(component.historial).toEqual(['20 / 4 = 5']);
  });

  it('debe manejar la división por cero con "Error: División por 0"', () => {
    component.numero1 = 10;
    component.numero2 = 0;
    component.operacion = '/';
    component.calcular();

    expect(component.resultado).toBe('Error: División por 0');
    expect(component.historial).toEqual(['10 / 0 = Error: División por 0']);
  });

  it('debe agregar las operaciones más recientes arriba en el historial (unshift)', () => {
    component.numero1 = 2;
    component.numero2 = 3;
    component.operacion = '+';
    component.calcular();

    component.numero1 = 10;
    component.numero2 = 2;
    component.operacion = '*';
    component.calcular();

    expect(component.historial.length).toBe(2);
    expect(component.historial[0]).toBe('10 * 2 = 20');
    expect(component.historial[1]).toBe('2 + 3 = 5');
  });

  it('debe persistir el historial en localStorage al calcular', () => {
    component.numero1 = 100;
    component.numero2 = 50;
    component.operacion = '+';
    component.calcular();

    const stored = localStorage.getItem(component.STORAGE_KEY);
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual(['100 + 50 = 150']);
  });

  it('debe cargar el historial desde localStorage al inicializarse (ngOnInit)', () => {
    const mockData = ['5 + 5 = 10', '20 * 2 = 40'];
    localStorage.setItem('calculadora_historial', JSON.stringify(mockData));

    const newFixture = TestBed.createComponent(CalculadoraPage);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.historial).toEqual(mockData);
  });

  it('debe limpiar el historial y eliminarlo de localStorage correctamente', () => {
    component.numero1 = 5;
    component.numero2 = 5;
    component.operacion = '+';
    component.calcular();
    expect(component.historial.length).toBe(1);
    expect(localStorage.getItem(component.STORAGE_KEY)).toBeTruthy();

    component.limpiarHistorial();
    expect(component.historial.length).toBe(0);
    expect(localStorage.getItem(component.STORAGE_KEY)).toBeNull();
  });
});

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  calculatorOutline,
  timeOutline,
  trashOutline,
  alertCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
  ],
})
export class CalculadoraPage implements OnInit {
  numero1: number | null = null;
  numero2: number | null = null;
  operacion: string = '+';
  resultado: number | string | null = null;
  historial: string[] = [];

  readonly STORAGE_KEY = 'calculadora_historial';

  constructor() {
    addIcons({
      calculatorOutline,
      timeOutline,
      trashOutline,
      alertCircleOutline,
      checkmarkCircleOutline
    });
  }

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    try {
      const guardado = localStorage.getItem(this.STORAGE_KEY);
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed)) {
          this.historial = parsed;
        }
      }
    } catch (error) {
      console.error('Error al cargar historial desde almacenamiento local', error);
    }
  }

  guardarHistorial() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.historial));
    } catch (error) {
      console.error('Error al guardar historial en almacenamiento local', error);
    }
  }

  calcular() {
    if (this.numero1 === null || this.numero2 === null) {
      return;
    }

    let res: number | string = 0;

    switch (this.operacion) {
      case '+':
        res = this.numero1 + this.numero2;
        break;
      case '-':
        res = this.numero1 - this.numero2;
        break;
      case '*':
        res = this.numero1 * this.numero2;
        break;
      case '/':
        res = this.numero2 === 0 ? 'Error: División por 0' : this.numero1 / this.numero2;
        break;
    }

    this.resultado = res;
    this.historial.unshift(`${this.numero1} ${this.operacion} ${this.numero2} = ${this.resultado}`);
    this.guardarHistorial();
  }

  limpiarHistorial() {
    this.historial = [];
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error al eliminar historial del almacenamiento local', error);
    }
  }
}

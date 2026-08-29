import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  numero1: number | null = null;
  numero2: number | null = null;
  operacion: string = '+';
  resultado: number | string | null = null;
  historial: string[] = [];

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
  }
}

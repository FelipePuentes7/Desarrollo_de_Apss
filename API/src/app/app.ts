import { Component } from '@angular/core';
import { CharacterListComponent } from './components/character-list/character-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterListComponent],
  template: `<app-character-list></app-character-list>`
})
export class App {}

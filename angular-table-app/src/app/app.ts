import {
  Component,
  signal,
} from '@angular/core';

import { TableBanchmark } from './components/table-banchmark/table-banchmark';

@Component({
  selector: 'app-root',
  imports: [TableBanchmark],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-table-app');
}

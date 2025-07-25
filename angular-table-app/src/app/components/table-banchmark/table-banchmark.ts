import {
  Component,
  signal,
  WritableSignal,
} from '@angular/core';

import {
  generateRows,
  Row,
} from '../../utils/data-generator';
import { DataTable } from '../data-table/data-table';

@Component({
  selector: 'app-table-banchmark',
  imports: [DataTable],
  template: `
    <main>
      <h1>Angular 10,000 Row Table</h1>
      <app-data-table [rows]="initialRows()" (updateRows)="handleRowsUpdate($event)"></app-data-table>
    </main>
  `,
  styleUrl: './table-banchmark.css'
})
export class TableBanchmark {
 initialRows: WritableSignal<Row[]> = signal([]);

  ngOnInit(): void {
    console.time('Angular Initial Data Generation');
    this.initialRows.set(generateRows(10000));
    console.timeEnd('Angular Initial Data Generation');
  }

  handleRowsUpdate(updatedRows: Row[]) {
    this.initialRows.set(updatedRows);
  }
}

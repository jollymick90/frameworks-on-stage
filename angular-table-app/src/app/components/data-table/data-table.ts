import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel

import { Row } from '../../utils/data-generator';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, ScrollingModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.css']
})
export class DataTable {

  @Input() set rows(value: Row[]) {
    this.allRows.set(value);
    this.applyFilter(); // Re-apply filter when initial rows change
  }
  @Output() updateRows = new EventEmitter<Row[]>();

  allRows: WritableSignal<Row[]> = signal([]);
  filteredRows: WritableSignal<Row[]> = signal([]);
  selectedRowId: WritableSignal<number | null> = signal(null);
  filterTerm: WritableSignal<string> = signal('');
  nextId: WritableSignal<number> = signal(10001); // Start after initial 10000

  constructor() {
    // Initialize filtered rows on component load
    this.filteredRows.set(this.allRows());
  }
 trackById(index: number, row: Row): number {
    return row.id;
  }
  // Action: Select Row
  selectRow(row: Row): void {
    const currentId = this.selectedRowId();
    const newSelectedId = currentId === row.id ? null : row.id;

    const updatedRows = this.allRows().map(r => ({
      ...r,
      isSelected: r.id === newSelectedId
    }));
    this.allRows.set(updatedRows);
    this.selectedRowId.set(newSelectedId);
    this.applyFilter(); // Update filtered view
    this.updateRows.emit(this.allRows()); // Emit update for parent to potentially persist
  }

  // Action: Add Row
  addRow(): void {
    const newRow: Row = {
      id: this.nextId(),
      name: `New User ${this.nextId()}`,
      email: `newuser${this.nextId()}@example.com`,
      address: `New Address ${this.nextId()}`,
      isSelected: false,
    };
    this.allRows.update(rows => [...rows, newRow]);
    this.nextId.update(id => id + 1);
    this.applyFilter(); // Update filtered view
    this.updateRows.emit(this.allRows());
  }

  // Action: Update Row
  updateSelectedRow(): void {
    const selectedId = this.selectedRowId();
    if (selectedId === null) {
      alert('Please select a row to update.');
      return;
    }

    const updatedRows = this.allRows().map(row =>
      row.id === selectedId
        ? { ...row, name: `Updated ${row.name}`, email: `updated_${row.email}` }
        : row
    );
    this.allRows.set(updatedRows);
    this.applyFilter(); // Update filtered view
    this.updateRows.emit(this.allRows());
  }

  // Action: Delete Row
  deleteSelectedRow(): void {
    const selectedId = this.selectedRowId();
    if (selectedId === null) {
      alert('Please select a row to delete.');
      return;
    }

    this.allRows.update(rows => rows.filter(row => row.id !== selectedId));
    this.selectedRowId.set(null); // Deselect after deletion
    this.applyFilter(); // Update filtered view
    this.updateRows.emit(this.allRows());
  }

  // Action: Filter Rows
  onFilterChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterTerm.set(inputElement.value.toLowerCase());
    this.applyFilter();
  }

  applyFilter(): void {
    const term = this.filterTerm();
    if (!term) {
      this.filteredRows.set(this.allRows());
    } else {
      this.filteredRows.set(
        this.allRows().filter(row =>
          row.name.toLowerCase().includes(term) ||
          row.email.toLowerCase().includes(term) ||
          row.address.toLowerCase().includes(term)
        )
      );
    }
  }

}

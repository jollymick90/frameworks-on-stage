import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBanchmark } from './table-banchmark';

describe('TableBanchmark', () => {
  let component: TableBanchmark;
  let fixture: ComponentFixture<TableBanchmark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBanchmark]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBanchmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

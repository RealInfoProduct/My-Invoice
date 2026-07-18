import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteDialogComponent } from './debit-note-dialog.component';

describe('DebitNoteDialogComponent', () => {
  let component: DebitNoteDialogComponent;
  let fixture: ComponentFixture<DebitNoteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitNoteDialogComponent]
    });
    fixture = TestBed.createComponent(DebitNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

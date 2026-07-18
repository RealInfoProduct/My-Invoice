import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteDialogComponent } from './credit-note-dialog.component';

describe('CreditNoteDialogComponent', () => {
  let component: CreditNoteDialogComponent;
  let fixture: ComponentFixture<CreditNoteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditNoteDialogComponent]
    });
    fixture = TestBed.createComponent(CreditNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

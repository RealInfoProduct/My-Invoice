import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteComponent } from './debit-note.component';

describe('DebitNoteComponent', () => {
  let component: DebitNoteComponent;
  let fixture: ComponentFixture<DebitNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitNoteComponent]
    });
    fixture = TestBed.createComponent(DebitNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

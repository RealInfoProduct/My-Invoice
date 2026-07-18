import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteComponent } from './credit-note.component';

describe('CreditNoteComponent', () => {
  let component: CreditNoteComponent;
  let fixture: ComponentFixture<CreditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditNoteComponent]
    });
    fixture = TestBed.createComponent(CreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

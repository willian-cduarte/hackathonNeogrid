import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirTicketComponent } from './incluir-ticket.component';

describe('IncluirTicketComponent', () => {
  let component: IncluirTicketComponent;
  let fixture: ComponentFixture<IncluirTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

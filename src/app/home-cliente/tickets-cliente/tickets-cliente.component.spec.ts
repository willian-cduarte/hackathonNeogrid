import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsClienteComponent } from './tickets-cliente.component';

describe('TicketsClienteComponent', () => {
  let component: TicketsClienteComponent;
  let fixture: ComponentFixture<TicketsClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
